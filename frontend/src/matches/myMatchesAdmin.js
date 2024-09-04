import React, { useEffect, useRef, useState } from 'react';
import '../App.css';
import '../static/css/westernTheme.css';
import tokenService from '../services/token.service';
import { Link } from "react-router-dom";
import useFetchState from "../util/useFetchState";
import jwtDecode from 'jwt-decode';
import { Form, Table, FormGroup, Label, Input, Button } from 'reactstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const jwt = tokenService.getLocalAccessToken();

export default function MyMatchesAdmin() {
    const username = jwt ? jwtDecode(jwt).sub : "null";
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [filterInProgress, setFilterInProgress] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [matches, setMatches] = useFetchState(
        [],
        `/api/v1/matches`,
        jwt,
        setMessage,
        setVisible
    );
    const [matchList, setMatchList] = useState([]);

    async function handleUpdateMatches() {
        try {
            const response = await fetch(`/api/v1/matches`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const newMatches = await response.json();
            setMatches(newMatches);
        } catch (error) {
            console.error('Error fetching matches:', error);
        }
    }

    useEffect(() => {
        if (jwt) {
            const socket = new SockJS('http://localhost:8080/ws');
            const client = Stomp.over(socket);

            client.connect({}, () => {
                client.subscribe('/topic/match/messages', (message) => {
                    const body = JSON.parse(message.body);
                    if (['CREATED', 'DELETE', 'START'].includes(body.type)) {
                        handleUpdateMatches();
                    }
                });

                setStompClient(client);
            });

            return () => {
                if (client && client.connected) {
                    client.disconnect();
                }
            };
        }
    }, [jwt]);

    useEffect(() => {
        if (filterInProgress) {
            setMatchList(matches.filter((match) => match.matchState === "IN_PROGRESS"));
        } else {
            setMatchList(matches.filter((match) => match.matchState === "CLOSED"));
        }
    }, [filterInProgress, matches]);

    const toggleFilterInProgress = () => {
        setFilterInProgress(!filterInProgress);
    };

    return (
        <div>
            <div className="admin-page-container">
                <div className="hero-div">
                    <h1 className="text-center">ALL GAMES</h1>
                    <div>
                        <Table aria-label="onlineGames" className="table-western">
                            <thead>
                                <tr>
                                    <th className="table-western">NAME</th>
                                    <th className="table-western">STATE</th>
                                    <th className="table-western">CREATOR</th>
                                    <th className="table-western">PLAYERS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {matchList.map((m) => (
                                    <tr key={m.id}>
                                        <td className='table-western'>{m.name}</td>
                                        <td className='table-western'>{m.matchState}</td>
                                        <td className='table-western'>{m.joinedPlayers[0]}</td>
                                        <td className='table-western'>{m.joinedPlayers[0]}, {m.joinedPlayers[1]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={toggleFilterInProgress}>
                                {filterInProgress ? 'Show closed matches' : 'Show matches in progress'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
