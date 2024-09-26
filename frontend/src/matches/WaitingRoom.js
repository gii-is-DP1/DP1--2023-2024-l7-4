import React from "react";
import "../App.css";
import "../static/css/westernTheme.css";
import tokenService from "../services/token.service";
import { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import useFetchState from "../util/useFetchState";

import getIdFromUrl from "../util/getIdFromUrl";
import jwtDecode from "jwt-decode";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import axios from "axios";

export default function WaitingRoom() {
  const id = getIdFromUrl(2);
  const jwt = tokenService.getLocalAccessToken();
  const username = jwtDecode(jwt).sub;
  const user = tokenService.getUser();
  const [showDropdown, setShowDropdown] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const playerId = user ? user.id : null;

  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [joinedPlayers, setJoinedPlayers] = useState([]);
  const [waitingMessage, setWaitingMessage] = useState(
    "Waiting for host to start the game..."
  );
  const [match, setMatch] = useState([]);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [selectedMode, setSelectedMode] = useState(null);

  const [friendsOnline, setFriendsOnline] = useFetchState(
    [],
    `/api/v1/players/${playerId}/friends/online`,
    jwt,
    setMessage,
    setVisible
  );
  useEffect(() => {
    if (joinedPlayers) {
      if (joinedPlayers[0] === username) {
        setWaitingMessage("Waiting for the oponent...");
      }
      if (joinedPlayers.length > 1) {
        setWaitingMessage(
          "Both players have joined, the host can start the game"
        );
        setShowDropdown(null);
      }
    }
  }, [match, joinedPlayers]);

  async function updateFriendsOnline() {
    if (!jwt) {
      console.error("JWT token is not available");
      return;
    }
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

  async function updateJoinedPlayers() {
    if (!jwt) {
      console.error("JWT token is not available");
      return;
    }
    try {
      const response = await fetch(`/api/v1/matches/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const newJoinedPlayers = await response.json();
      setJoinedPlayers(newJoinedPlayers.joinedPlayers);
    } catch (error) {
      console.error("Error fetching new joined players:", error);
    }
  }

  useEffect(() => {
    if (jwt) {
      setFriendsOnline([]);

      const intervalId = setInterval(updateFriendsOnline, 5000); // Actualiza cada 5 segundos

      // Limpia el intervalo cuando el componente se desmonte
      return () => clearInterval(intervalId);
    }
  }, [playerId, jwt]);

  useEffect(() => {
    if (jwt) {
      setJoinedPlayers([]);
      const intervalId = setInterval(updateJoinedPlayers, 10000); // Actualiza cada 5 segundos

      // Limpia el intervalo cuando el componente se desmonte
      return () => clearInterval(intervalId);
    }
  }, [playerId, jwt]);

  const handleInviteClick = (index) => {
    setShowDropdown(index);
  };

  const handleFriendSelect = (event) => {
    setSelectedFriend(event.target.value);
    // Aquí puedes agregar la lógica para enviar la invitación al amigo seleccionado
  };

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const client = Stomp.over(socket);

    handleUpdateMatch(); //Fetch initial match data

    client.connect({}, () => {
      client.subscribe(`/topic/match/${id}/messages`, (message) => {
        const body = JSON.parse(message.body);
        if (body.type === "DELETE") {
          window.location.href = "/";
        } else if (body.type === "JOIN" || body.type === "UNJOIN") {
          handleUpdateMatch();
        } else if (body.type === "START") {
          window.location.href = `/game/${id}`;
        }
      });
      setStompClient(client);
    });
    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []);

  const handleSendMessage = (type) => {
    if (type === "DELETE") {
      stompClient.send(
        `/app/match/messages`,
        {},
        JSON.stringify({
          type: type,
          message: "Match delete",
        })
      );
      stompClient.send(
        `/app/match/${id}/messages`,
        {},
        JSON.stringify({
          type: type,
          message: "Match delete",
        })
      );
    } else if (type === "UNJOIN") {
      stompClient.send(
        `/app/match/${id}/messages`,
        {},
        JSON.stringify({
          type: type,
          message: "Player unjoined",
        })
      );
    } else if (type === "START") {
      stompClient.send(
        `/app/match/${id}/messages`,
        {},
        JSON.stringify({
          type: type,
          message: "Match Started",
        })
      );
      stompClient.send(
        `/app/match/messages`,
        {},
        JSON.stringify({
          type: type,
          message: "Match Started",
        })
      );
    }
  };

  async function handleUpdateMatch() {
    try {
      const response = await fetch(`/api/v1/matches/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const newMatch = await response.json();
      setMatch(newMatch);
      setJoinedPlayers(newMatch.joinedPlayers);
    } catch (error) {
      console.error("Error fetching matches:", error);
    }
  }

  const handleStartMatch = async () => {
    try {
      await fetch(`/api/v1/matches/${id}/start`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then(handleSendMessage("START"))
        .then((window.location.href = `/game/${id}`));
    } catch (error) {
      console.error("Error Starting:", error);
    }
  };

  const handleGoToLobby = async () => {
    if (match.joinedPlayers[0] === username) {
      try {
        await fetch(`/api/v1/matches/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then(handleSendMessage("DELETE"))
          .then((window.location.href = "/"));
      } catch (error) {
        console.error("Error Deleting:", error);
      }
    } else {
      try {
        await fetch("/api/v1/matches/" + id + "/unjoin", {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${jwt}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(username),
        })
          .then(handleSendMessage("UNJOIN"))
          .then((window.location.href = "/"));
      } catch (error) {
        console.error("Error Unjoining:", error);
      }
    }
  };

  // Mostrar el modal de confirmación al intentar salir de la página
  const handleConfirmLeave = () => {
    setShowConfirmationModal(true);
  };

  // Redirigir a Lobby cuando se confirme la salida
  const handleConfirmGoToLobby = () => {
    setShowConfirmationModal(false);
    handleGoToLobby();
  };

  // Cancelar la salida y cerrar el modal
  const handleCancelLeave = () => {
    setShowConfirmationModal(false);
  };
  async function handleSendGameRequest(friend, selectedMode) {
    try {
      const id = getIdFromUrl(2);

      const gamerequest = {
        status: "PENDING",
        matchId: id,
        playerOne: String(playerId),
        playerTwo: friend,
        type: selectedMode,
      };

      const response = await axios.post(`/api/v1/gameRequests`, gamerequest, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (response.status !== 201) {
        throw new Error("Failed to invite friend to match");
      }
    } catch (error) {
      console.error("Error inviting friend:", error);
    }
  }

  return (
    <div className="admin-page-container">
      <Modal isOpen={showConfirmationModal}>
        <ModalHeader
          toggle={handleCancelLeave}
          style={{ fontFamily: "Almendra SC" }}
        ></ModalHeader>
        <ModalBody style={{ fontFamily: "Almendra SC" }}>
          Are you sure you want to leave?
        </ModalBody>
        <ModalFooter>
          <Button
            color="danger"
            style={{ fontFamily: "Almendra SC" }}
            onClick={handleConfirmGoToLobby}
          >
            Yes, leave
          </Button>
          <Button
            color="secondary"
            style={{ fontFamily: "Almendra SC" }}
            onClick={handleCancelLeave}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <div>
        <div className="hero-div">
          <h1 className="text-center">JOINED PLAYERS</h1>
          <div>
            <Table aria-label="achievements" className="table-western">
              <thead>
                <tr>
                  <th className="table-western th">PLAYERS</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(joinedPlayers) &&
                  joinedPlayers.map((player, index) => (
                    <tr key={index}>
                      <td className="table-western td">{player}</td>
                      <td className="table-western td">
                        {joinedPlayers.length <= 1 && (
                          <Button onClick={() => handleInviteClick(index)}>
                            Invite
                          </Button>
                        )}
                        {showDropdown === index && (
                          <>
                            <select onChange={handleFriendSelect}>
                              <option value="">Select a friend</option>
                              {friendsOnline.map((friend, i) => (
                                <option key={friend.id} value={friend.id}>
                                  {friend.username}
                                </option>
                              ))}
                            </select>

                            {selectedFriend && (
                              <>
                                <select
                                  onChange={(e) =>
                                    setSelectedMode(e.target.value)
                                  } // Nuevo estado para guardar el modo
                                >
                                  <option value="">Select Mode</option>
                                  <option value="player">Player</option>
                                  <option value="spectator">Spectator</option>
                                </select>
                                {console.log(selectedMode)}
                                {selectedMode && ( // Mostrar el botón solo si se ha seleccionado el modo
                                  <button
                                    onClick={() => {
                                      handleSendGameRequest(
                                        selectedFriend,
                                        selectedMode
                                      ); // Enviar el modo también
                                      setShowDropdown(null);
                                    }}
                                  >
                                    Send
                                  </button>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {joinedPlayers &&
            (joinedPlayers.length === 2 && username === joinedPlayers[0] ? (
              <span></span>
            ) : (
              <span className="western-message">{waitingMessage}</span>
            ))}
        </div>
      </div>

      <div style={{ textAlign: "center" }}>
        <Button className="button-container-bad" onClick={handleConfirmLeave}>
          Go to Lobby
        </Button>
        {console.log(match.joinedPlayers)}
        {joinedPlayers ? (
          joinedPlayers.length === 2 && joinedPlayers[0] === username ? (
            <Button className="button-container" onClick={handleStartMatch}>
              Start Match
            </Button>
          ) : (
            <span></span>
          )
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}
