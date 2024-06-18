import React from 'react';
import '../App.css';
import '../static/css/home/home.css';
import tokenService from '../services/token.service';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import useFetchState from "../util/useFetchState";
import getIdFromUrl from "../util/getIdFromUrl";
import jwtDecode from 'jwt-decode';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default function WaitingRoom() {
    const id = getIdFromUrl(2);
    const jwt = tokenService.getLocalAccessToken();
    const username = jwtDecode(jwt).sub;
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [joinedPlayers, setJoinedPlayers] = useState([]);
    const [waitingMessage, setWaitingMessage] = useState(' Waiting for host starting the game... ');
    const [match, setMatch] = useFetchState(
        [],
        `/api/v1/matches/${id}`,
        jwt,
        setMessage,
        setVisible,
        id
    );


    async function handleSendMessage(type, general) {
        if (general) {
            stompClient.send(`/app/match/messages`, {}, JSON.stringify({
                type: type,
                message: 'Match delete'
            }));
        } else {
            stompClient.send(`/app/match/${id}/messages`, {}, JSON.stringify({
                type: type,
                message: 'Match delete'
            }));
        }
    }


    async function handleUpdateMatch() {
        try {
            const response = await fetch(`/api/v1/matches/${id}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const newMatch = await response.json();
            setMatch(newMatch);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    }

    async function handleGoToLobby() {

        if (match.joinedPlayers[0] === username) {
            try {
                const response = await fetch(`/api/v1/matches/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                stompClient.send(`/app/match/messages`, {}, JSON.stringify({
                    type: 'DELETE',
                    message: 'Match delete'
                }));

                stompClient.send(`/app/match/${id}/messages`, {}, JSON.stringify({
                    type: 'DELETE',
                    message: 'Match delete'
                }));

            } catch (error) {
                console.error('Error Deleting:', error);
            }

        } else {
            const response = await fetch(`/api/v1/matches/${id}/unjoin`, {
                method: 'PUT',
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: username
            });

            stompClient.send(`/app/match/${id}/messages`, {}, JSON.stringify({
                type: 'UNJOIN',
                message: 'Player left'
            }));

        }
    }

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);
        client.connect({}, () => {
            client.subscribe(`/topic/match/${id}/messages`, (message) => {
                const body = JSON.parse(message.body);
                if (body.type === 'DELETE') {
                    window.location.href = ("/");
                    setMessage(body.message);
                }
                if (body.type === "UNJOIN") {
                    setMessage(body.message);
                }
            });
            setStompClient(client);
            
            return () => {
                if (client && client.connected) {
                  client.disconnect();
                }
              };
          
            
        });

        setJoinedPlayers(match.joinedPlayers);
        handleUpdateMatch()
        // Limpia el intervalo cuando el componente se desmonta

    }, [match, message]);

    return (
        <div>
            <div className="admin-page-container">
                <div className="hero-div">
                    <h1 className="text-center"> JOINED PLAYERS</h1>
                    <div>
                        <Table aria-label="achievements" className="mt-4">
                            <thead>
                                <tr>
                                    <th className="text-center">  PLAYERS</th>
                                </tr>
                            </thead>
                            <tbody>{joinedPlayers}</tbody>
                        </Table>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Button outline color="danger" onClick={handleGoToLobby}>
                    <Link to={`/`} className="btn sm" style={{ textDecoration: "none" }}>
                        Go to Lobby
                    </Link>
                </Button>

                {match.joinedPlayers ? (match.joinedPlayers.length === 2 ? (
                    <Button outline color="primary">
                        <Link to={`/game/${id}`} className="btn sm" style={{ textDecoration: "none" }}>
                            Start Match
                        </Link>
                    </Button>
                ) : waitingMessage) : "Loading.."}
            </div>
        </div>

    );
}