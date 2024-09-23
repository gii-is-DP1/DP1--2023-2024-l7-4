import React, { useEffect, useState } from "react";
import "../static/css/westernTheme.css";
import tokenService from "../services/token.service";
import { Link } from "react-router-dom";
import useFetchState from "../util/useFetchState";
import jwtDecode from 'jwt-decode';
import { Button, Table } from 'reactstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import ImageButton from '../components/buttons/imageButton';


const jwt = tokenService.getLocalAccessToken();

export default function Home() {
  const username = jwt ? jwtDecode(jwt).sub : "null";
  const user = tokenService.getUser();
  const playerId = user ? user.id : null;
  const [message, setMessage] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [visible, setVisible] = useState(false);
  const [openMatches, setOpenMatches] = useFetchState(
    [],
    `/api/v1/matches?open=true`,
    jwt,
    setMessage,
    setVisible
  );

  const [inProgressMatches, setInProgressMatches] = useFetchState(
    [],
    `/api/v1/matches?inProgress=true`,
    jwt,
    setMessage,
    setVisible
  );

  const [friendsOnline, setFriendsOnline] = useFetchState(
    [],
    `api/v1/players/${playerId}/friends/online`,
    jwt,
    setMessage,
    setVisible
  );

  console.log(friendsOnline);

  useEffect(() => {
    setFriendsOnline([]);
    const intervalId = setInterval(updateFriendsOnline, 5000); // Actualiza cada 5 segundos

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, [playerId, jwt]);

  async function updateFriendsOnline() {
    try {
      const response = await fetch(
        `/api/v1/players/${playerId}/friends/online`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const newFriendsOnline = await response.json();
      setFriendsOnline(newFriendsOnline);
    } catch (error) {
      console.error("Error fetching new friends online:", error);
    }
  }

  async function handleUpdateMatches() {
    try {
      let response = await fetch(`/api/v1/matches?open=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      let newMatches = await response.json();
      setOpenMatches(newMatches);
      response = await fetch(`/api/v1/matches?inProgress=true`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      newMatches = await response.json();
      setInProgressMatches(newMatches);
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
      });

      setStompClient(client);

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
    const matchesList = openMatches.map((m) => {
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
          <div className="hero-div">
            Online Friends
            <div>
              {friendsOnline.map((f) => (
                <div key={f.id}>{f.nickname}
                  {console.log(inProgressMatches)}
                  {inProgressMatches.map((match) => {
                    const allFriendsInMatch = match.joinedPlayers.includes(f.username) && match.joinedPlayers.every(player =>
                      friendsOnline.some(friend => friend.username === player)
                    );

                    if (allFriendsInMatch) {
                      return (
                        <Link key={match.id} to={`/game/${match.id}`}>
                          Espectar
                        </Link>
                      );
                    }

                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>

          <div className="hero-div">
            <h1> ONLINE GAMES</h1>
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
                  imgSrc={`${process.env.PUBLIC_URL}/scope.png`}
                  style={{ width: "50px", height: "50px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
