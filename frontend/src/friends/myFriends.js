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

  console.log(playerId);
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

  const [mymatches, setMyMatches] = useFetchState(
    [],
    `/api/v1/matches/player/${username}`,
    jwt,
    setMessage,
    setVisible
  );

  const [myGamesRequests, setMyGamesRequests] = useFetchState(
    [],
    `/api/v1/gameRequests/${playerId}/received`,
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

  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showSelect, setShowSelect] = useState(null);

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

  const toggleSelect = (friendId) => {
    setShowSelect((prev) => (prev === friendId ? null : friendId));
  };

  async function handleAddFriendToMatch(matchId, friend) {
    try {
      const response = await axios.put(
        `/api/v1/matches/${matchId}/join`,
        friend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      console.log(friend);
      if (response.status !== 201) {
        throw new Error("Failed to invite friend to match");
      }
    } catch (error) {
      console.error("Error inviting friend:", error);
    }
  }

  const handleAcceptGameRequest = async (gameRequestId) => {
    try {
      const updatedGameRequest = {
        status: "ACCEPTED",
      };

      const response = await axios.put(
        `/api/v1/gameRequests/${gameRequestId}`,
        updatedGameRequest,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMyGamesRequests((prevRequest) =>
          prevRequest.filter((gamerequest) => gamerequest.id !== gameRequestId)
        );
      } else {
        throw new Error("Hubo un error al actualizar la solicitud.");
      }
    } catch (error) {
      console.error(error);
      setError("Hubo un error al aceptar la solicitud.");
    }
  };

  const handleDeclineGameRequest = async (gameRequestId) => {
    try {
      const response = await axios.delete(
        `/api/v1/gameRequests/${gameRequestId}`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 204) {
        setMyGamesRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== gameRequestId)
        );
      } else {
        throw new Error("Hubo un error al eliminar la solicitud.");
      }
    } catch {
      console.error(error);
      setError("Hubo un error al rechazar la solicitud.");
    }
  };

  return (
    <div className="admin-page-container">
      <div className="container">
        <div className="hero-div">
          <div className="friends-header">Friends</div>
          <div>
            {friends
              .slice() // Crea una copia del array original para no mutarlo
              .sort((a, b) => a.name.localeCompare(b.name)) // Ordena alfabéticamente
              .map((friend, index) => (
                <div key={friend.id}>
                  {friend.name}
                  {/* Botón para alternar la visibilidad del menú de selección de partida */}
                  <Button onClick={() => toggleSelect(friend.id)}>
                    {showSelect === friend.id ? "Select Match" : "Invite Match"}
                  </Button>

                  {/* Si el estado showSelect es igual al id del amigo, se muestra el menú de selección */}
                  {showSelect === friend.id && (
                    <div>
                      <select
                        onChange={(e) => setSelectedMatch(e.target.value)}
                      >
                        <option value="">Select a match</option>
                        {/* Mapeo de las partidas disponibles */}
                        {mymatches.map((match) => (
                          <option key={match.id} value={match.id}>
                            {match.name}
                          </option>
                        ))}
                      </select>
                      {/* Botón para confirmar la invitación, habilitado solo si se selecciona una partida */}
                      <Button
                        onClick={() =>
                          handleAddFriendToMatch(selectedMatch, friend.username)
                        }
                        disabled={!selectedMatch} // Deshabilita si no se ha seleccionado una partida
                      >
                        Confirm Invitation
                      </Button>{" "}
                    </div>
                  )}
                </div>
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
          <div>
            {myGamesRequests.map((myGameRequest) => (
              <div key={myGameRequest.id}>
                {myGameRequest.playerOne.name}
                <div>
                  <Button
                    onClick={() => handleAcceptGameRequest(myGameRequest.id)}
                    color="success"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => handleDeclineGameRequest(myGameRequest.id)}
                    color="danger"
                  >
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
