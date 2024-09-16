import React, { useEffect, useState } from "react";
import "../static/css/westernTheme.css";
import tokenService from "../services/token.service";
import { Link } from "react-router-dom";
import useFetchState from "../util/useFetchState";
import jwtDecode from "jwt-decode";
import { Form, Table, FormGroup, Label, Input, Button } from "reactstrap";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import ImageButton from "../components/buttons/imageButton";

const jwt = tokenService.getLocalAccessToken();

export default function Home() {
  const username = jwt ? jwtDecode(jwt).sub : "null";
  const user = tokenService.getUser();

  const [message, setMessage] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [visible, setVisible] = useState(false);
  const [matches, setMatches] = useFetchState(
    [],
    `/api/v1/matches?open=true`,
    jwt,
    setMessage,
    setVisible
  );

  async function handleUpdateMatches() {
    try {
      const response = await fetch(`/api/v1/matches?open=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const newMatches = await response.json();
      setMatches(newMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }

  useEffect(() => {
    if (jwt) {
      const socket = new SockJS("http://localhost:8080/ws");
      const client = Stomp.over(socket);

      client.connect({}, () => {
        client.subscribe("/topic/match/messages", (message) => {
          const body = JSON.parse(message.body);
          if (body.type === "CREATED" || "DELETE" || "START")
            handleUpdateMatches();
        });

        setStompClient(client);
      });

      return () => {
        if (client && client.connected) {
          client.disconnect();
        }
      };
    }
  }, []);

  async function handleJoinGame(id) {
    stompClient.send(
      `/app/match/${id}/messages`,
      {},
      JSON.stringify({
        type: "JOIN",
        message: "Player joined",
      })
    );
  }

  if (!jwt) {
    return (
      <div className="admin-page-container">
        <div className="hero-div">
          <h1>Gunfighter</h1>
          <h3>---</h3>
          <h3>READY?</h3>
        </div>
      </div>
    );
  } else {
    const matchesList = matches.map((m) => {
      return (
        <tr key={m.id}>
          <td className="table-western td">{m.name}</td>
          <td className="table-western td">{m.matchState}</td>
          <td className="table-western td">
            {m.matchState === "OPEN" && (
              <Link
                to={`/match/${m.id}/waitingRoom`}
                className="image-button"
                style={{ textDecoration: "none" }}
                onClick={() => {
                  fetch("/api/v1/matches/" + m.id + "/join", {
                    method: "PUT",
                    headers: {
                      Authorization: `Bearer ${jwt}`,
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(username),
                  }).then(handleJoinGame(m.id));
                }}
              ></Link>
            )}
          </td>
        </tr>
      );
    });

    return (
      <div>
        <div className="admin-page-container">
          <div className="hero-div">Online Friends</div>

          <div className="hero-div">
            <h1 className="text-center"> ONLINE GAMES</h1>
            <div>
              <Table aria-label="onlineGames" className="table-western">
                <thead>
                  <tr>
                    <th className="table-western th">NAME</th>
                    <th className="table-western th">STATE</th>
                    <th className="table-western th">PLAY</th>
                  </tr>
                </thead>
                <tbody>{matchesList}</tbody>
              </Table>
              <div style={{ textAlign: "center" }}>
                <ImageButton
                  to="/match/create"
                  imgSrc={`${process.env.PUBLIC_URL}/scope.png`} // Cambia esto a la ruta de tu imagen
                  style={{ width: "50px", height: "50px" }} // Ajusta el tamaño según tus necesidades
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
