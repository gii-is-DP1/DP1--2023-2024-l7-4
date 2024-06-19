import React from 'react';
import '../App.css';
import '../static/css/westernTheme.css';
import tokenService from '../services/token.service';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
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
    const [waitingMessage, setWaitingMessage] = useState('Waiting for host to start the game...');
    const [match, setMatch] = useState([]);

    async function handleSendMessage(type) {


        if (type === 'DELETE') {
            stompClient.send(`/app/match/messages`, {}, JSON.stringify({
                type: type,
                message: 'Match delete'
            }));
            stompClient.send(`/app/match/${id}/messages`, {}, JSON.stringify({
                type: type,
                message: 'Match delete'
            }));
        }
        else if (type === 'UNJOIN') {
            stompClient.send(`/app/match/${id}/messages`, {}, JSON.stringify({
                type: 'UNJOIN',
                message: 'Player unjoined'
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
            setJoinedPlayers(newMatch.joinedPlayers);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    }

    async function handleGoToLobby() {
        if (match.joinedPlayers[0] === username) {
            try {
                await fetch(`/api/v1/matches/${id}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(handleSendMessage('DELETE')).then(window.location.href = ('/'));

            } catch (error) {
                console.error('Error Deleting:', error);
            }
        } else {

            try {

                await fetch('/api/v1/matches/' + id + "/unjoin", {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(username),
                }).then(handleSendMessage('UNJOIN'));

            } catch (error) {
                console.error('Error Unjoining:', error);
            }
        }
    }

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        handleUpdateMatch(); // Fetch the initial match data

        client.connect({}, () => {
            client.subscribe(`/topic/match/${id}/messages`, (message) => {
                const body = JSON.parse(message.body);
                if (body.type === "DELETE") {
                    window.location.href = "/";
                } else if (body.type === "JOIN" || body.type === "UNJOIN") {
                    handleUpdateMatch();
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

    return (
        <div className="admin-page-container">
            <div>
                <div className="hero-div">
                    <h1 className="text-center">JOINED PLAYERS</h1>
                    <div>
                        <Table aria-label="achievements" className="mt-4">
                            <thead>
                                <tr>
                                    <th className="text-center">PLAYERS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {joinedPlayers.map((player, index) => (
                                    <tr key={index}>
                                        <td className="text-center">{player}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <Button className="button-container btn" onClick={handleGoToLobby}>
                    Go to Lobby
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
