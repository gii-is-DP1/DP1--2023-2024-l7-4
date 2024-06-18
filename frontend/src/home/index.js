import React, { useEffect, useState } from 'react';
import '../App.css';
import '../static/css/home/home.css';
import tokenService from '../services/token.service';
import { Link } from "react-router-dom";
import useFetchState from "../util/useFetchState";
import jwtDecode from 'jwt-decode';
import { Form, Table, FormGroup, Label, Input, Button } from 'reactstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const jwt = tokenService.getLocalAccessToken();

export default function Home() {
    const username = jwt ? jwtDecode(jwt).sub : "null";
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
                    if (body.type === 'CREATED' || 'DELETED')
                        setMessage(body.message);
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


    useEffect(() => {
        if (jwt) {
            setMessage('waiting');
            handleUpdateMatches();
        }
    }, [setMatches, message]);

    if (!jwt) {
        return (
            <div className="home-page-container">
                <div className="hero-div">
                    <h1>Gunfighter</h1>
                    <h3>---</h3>
                    <h3>¿PREPARADO?</h3>
                </div>
            </div>
        );
    } else {

        const matchesList = matches.map((m) => {
            return (<tr key={m.id}>
                <td className="text-center"> {m.name}</td>
                <td className='text-center'>{m.matchState}</td>
                <td className="text-center">
                    {m.matchState === "OPEN" && (<Button outline color="success" size='sm' onClick={() => {
                        fetch('/api/v1/matches/' + m.id + "/join", {
                            method: 'PUT',
                            headers: {
                                "Authorization": `Bearer ${jwt}`,
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(username),
                        })
                    }}>
                        <Link to={`/match/${m.id}/waitingRoom`} className="btn btn-sm" style={{ textDecoration: "none" }}>JOIN</Link>
                    </Button>)}
                </td>
            </tr>
            );
        });

        return (
            <div>
                <div className="admin-page-container">
                    <div className="hero-div">
                        <h1 className="text-center"> ONLINE GAMES</h1>
                        <div>
                            <Table aria-label="achievements" className="mt-4">
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>STATE</th>
                                        <th>PLAY</th>
                                    </tr>
                                </thead>
                                <tbody>{matchesList}</tbody>
                            </Table>
                            <div style={{ textAlign: "center" }}>
                                <Button outline color="success">
                                    <Link
                                        to={`/match/create`} className="btn sm"
                                        style={{ textDecoration: "none" }}>Create Match</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}