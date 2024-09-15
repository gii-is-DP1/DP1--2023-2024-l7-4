import React, { useState, useEffect } from "react";
import "../App.css";
import { Form, Table, FormGroup, Label, Input, Button } from "reactstrap";
import axios from "axios";
import jwtDecode from "jwt-decode";
import tokenService from "../services/token.service";
import useFetchState from "../util/useFetchState";
import "../static/css/westernTheme.css";

const jwt = tokenService.getLocalAccessToken();
const user = tokenService.getUser();

export default function MyFriends() {
  const playerId = user.id;
  const username = jwt ? jwtDecode(jwt).sub : "null";

  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  const [friends, setFriends] = useFetchState(
    [],
    `/api/v1/players/${playerId}/friends`,
    jwt,
    setMessage,
    setVisible
  );

  const [pendingRequests, setPendingRequests] = useFetchState(
    [],
    `/api/v1/requests/${playerId}/received`,
    jwt,
    setMessage,
    setVisible
  );

  const [players, setPlayers] = useFetchState(
    [],
    `/api/v1/players`,
    jwt,
    setMessage,
    setVisible
  );

  async function updateFriends() {
    try {
      const response = await fetch(`/api/v1/players/${playerId}/friends`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const newFriends = await response.json();
      setFriends(newFriends);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  }

  async function updatePendingRequests() {
    try {
      const response = await fetch(`/api/v1/requests/${playerId}/received`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const newPendingRequests = await response.json();
      setPendingRequests(newPendingRequests);
    } catch (error) {
      console.error("Error fetching new pending requests:", error);
    }
  }

  async function updatePlayers() {
    try {
      const response = await fetch(`/api/v1/players`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const newPlayers = await response.json();
      setPlayers(newPlayers);
    } catch (error) {
      console.error("Error fetching new players:", error);
    }
  }

  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true); // Para gestionar el estado de carga

  const [loadingFriends, setLoadingFriends] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const [error, setError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAcceptRequest = async (requestId) => {
    try {
      const updatedRequest = {
        status: "ACCEPTED",
      };

      const response = await axios.put(
        `/api/v1/requests/${requestId}`,
        updatedRequest,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setPendingRequests((prevRequest) =>
          prevRequest.filter((request) => request.id !== requestId)
        );
        updateFriends();
        updatePendingRequests();
        updatePlayers();
      } else {
        throw new Error("Hubo un error al actualizar la solicitud.");
      }
    } catch (error) {
      console.error(error);
      setError("Hubo un error al aceptar la solicitud.");
    }
  };

  const handleDeclineRequest = async (requestId) => {
    try {
      const response = await axios.delete(`/api/v1/requests/${requestId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 204) {
        setPendingRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
        updateFriends();
        updatePendingRequests();
        updatePlayers();
      } else {
        throw new Error("Hubo un error al eliminar la solicitud.");
      }
    } catch {
      console.error(error);
      setError("Hubo un error al rechazar la solicitud.");
    }
  };

  const handleSendRequest = async (username) => {
    try {
      const player2 = players.find((player) => player.nickname === username);

      if (!player2) {
        setError(`Jugador con nombre ${username} no encontrado.`);
      }
      if (!user.username || !player2.username) {
        setError("Nombre de usuario del jugador no puede ser nulo.");
        return;
      }
      console.log("Enviando solicitud con los siguientes datos:", {
        playerOne: user.username,
        playerTwo: player2.username,
        status: "PENDING",
      });

      const requestData = {
        playerOne: user.username,
        playerTwo: player2.username,
        status: "PENDING",
      };

      const response = await axios.post(`/api/v1/requests`, requestData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Respuesta de la API:", response);

      if (response.status === 201) {
        setVisible(true);
        setMessage("Solicitud enviada correctamente.");
      }
      updateFriends();
      updatePendingRequests();
      updatePlayers();
    } catch (error) {
      console.error(error);
      setError("Hubo un error al enviar la solicitud.");
    }
  };

  //   useEffect(() => {
  //     if (friends) updateFriends();

  //     if (pendingRequests) updatePendingRequests();

  //     if (players) updatePlayers();
  //   }, [handleAcceptRequest, handleDeclineRequest, handleSendRequest]);
  // useEffect(() => {
  //   updateFriends();
  //   updatePendingRequests();
  //   updatePlayers();
  // }, []);

  return (
    <div className="admin-page-container">
      <div className="container">
        <div className="hero-div">
          <div className="friends-header">Online Friends</div>
          <div>
            {friends
              .slice() // Crea una copia del array original para no mutarlo
              .sort((a, b) => a.name.localeCompare(b.name)) // Ordena alfabéticamente
              .map((friend, index) => (
                <div key={friend.id}>{friend.name}</div>
              ))}
          </div>
        </div>

        <div className="hero-div">
          <div className="requests-header">Pending Requests</div>
          <div>
            {pendingRequests.map((request, index) => (
              <div key={request.id}>
                {request.playerOne.name}
                <div>
                  <Button
                    onClick={() => handleAcceptRequest(request.id)}
                    color="success"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleDeclineRequest(request.id)}
                    color="danger"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-div">
          <div className="search-header">Search new friends </div>
          <input
            type="text"
            placeholder="Write an username..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <Button color="primary" onClick={() => handleSendRequest(searchTerm)}>
            Send Request
          </Button>
          <div>
            {visible && <div className="success">{message}</div>}
            {error && <div className="error">{error}</div>}
          </div>
        </div>
        <div className="hero-div">
          <div className="friends-header">Game Invitations</div>
        </div>
      </div>
    </div>
  );
}
