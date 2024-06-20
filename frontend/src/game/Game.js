import React, { useEffect, useRef, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import getIdFromUrl from "../util/getIdFromUrl";
import tokenService from '../services/token.service';
import jwtDecode from 'jwt-decode';
import '../static/css/GameBoard.css';

const WebSocketComponent = () => {
    const jwt = tokenService.getLocalAccessToken();
    const username = jwt ? jwtDecode(jwt).sub : "null";
    const [playerNumber, setPlayerNumber] = useState(-1);
    //Jugador 1
    const [health, setHealth] = useState(2);
    const [bullets, setBullets] = useState(2);
    const [precision, setPrecision] = useState(2);
    const [cards, setCards] = useState([0])
    // Jugador 2
    const [healthMine, setHealthMine] = useState(2);
    const [bulletsMine, setBulletsMine] = useState(2);
    const [precisionMine, setPrecisionMine] = useState(2);
    const [cardsMine, setCardsMine] = useState(0)
    //Cosas en comun
    const [cardsSteal, setCardsSteal] = useState(50);
    const [stompClient, setStompClient] = useState(null);
    const [cardsPlayed, setCardsPlayed] = useState(0);

    const matchId = getIdFromUrl(2);


    async function handleAssignPLayers() {
        const matchPlayerList = await fetch(`/api/v1/matches/${matchId}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${jwt}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(match => { return match.joinedPlayers; })
            .catch(error => { console.error('Error fetching match:', error); return null; });

        setPlayerNumber(Array.from(matchPlayerList).findIndex(value => value === username));

    }

    // 1) hacer fetch de la match dada la Id y traer los jugadores
    // 2) Una vez traida la match con la lista de jugadores se le asigna con el índice que sea a cada jugador
    // 3) De tal forma un jugador tendrá el índice 0 y el otro el 1 y se podrá distinguir a los dos pistoleros
    // a la hora de usar los canales.

    //barajar cartas
    for (let i = cardsSteal.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
       [cardsSteal[i], cardsSteal[j]] = [cardsSteal[j], cardsSteal[i]];
       }


    useEffect(() => {

        if (matchId)
            handleAssignPLayers();

        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe(`/topic/${matchId}/gunfighter0`, (message) => {
                const body = JSON.parse(message.body);
                setHealthMine(body.health);
                setPrecisionMine(body.precision);
                setBulletsMine(body.bullets);
            });

            client.subscribe(`/topic/${matchId}/gunfighter1`, (message) => {
                const body = JSON.parse(message.body);
                setHealthMine(body.health);
                setPrecisionMine(body.precision);
                setBulletsMine(body.bullets);
            });

            setStompClient(client);

        });
 
        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };
    }, []);


    async function handleSendMessage(type) {
    //Mensaje por cada accion

        if (type === 'Player1') {
            stompClient.send(`/app/match/game/${matchId}/messages`, {}, JSON.stringify({
                type: type,
                message: 'Player1'
            }));
        }
        else if (type === 'Player2') {
            stompClient.send(`/app/match/game/${matchId}/messages`, {}, JSON.stringify({
                type: 'type',
                message: 'Player2'
            }));
        }
    }

    //funciones que por cada accion envie mensaje y que por cada mensaje recibido envie una funcion
    async function updatePlayer() {
            try {
                await fetch(`/api/v1/matches/game/${matchId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${jwt}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then(handleSendMessage('DELETE'));
            
            } catch (error) {
                console.error('Error Deleting:', error);
            }
        }

    const handleUpdatePlayerMine = (event) => {
        event.preventDefault();
        if (stompClient && stompClient.connected) {
            stompClient.send('/app/gunfighter', {}, JSON.stringify({
                health: healthMine,
                precision: precisionMine,
                bullets: bulletsMine
            }));
        }
    };

    const handleUpdatePlayer = (event) => {
        event.preventDefault();
        if (stompClient && stompClient.connected) {
            stompClient.send(`/app/${matchId}/gunfighter`, {}, JSON.stringify({
                health,
                precision,
                bullets
            }));
        }
    };

    const handleInputChange = (setter) => (event) => {
        const value = event.target.value;
        setter(value === '' ? 0 : parseInt(value, 10));
    };

    return (
      <div className="card-hand-grid">
            <div className="top-row">
                <button className="small-button">1</button>
                <button className="small-button">2</button>
                <button className="small-button">3</button>
                <button className="small-button">4</button>
                <button className="small-button">5</button>
                <button className="small-button">6</button>
                <button className="small-button">7</button>
            </div>
            <div className="middle-row">
                <button className="middle-button">1</button>
                <button className="middle-button">2</button>
                <button className="middle-button">3</button>
                <button className="middle-button">4</button>
            </div>
            <div className="bottom-row">
                <button className="large-button">1</button>
                <button className="large-button">2</button>
                <button className="large-button">3</button>
                <button className="large-button">4</button>
                <button className="large-button">5</button>
                <button className="large-button">6</button>
                <button className="large-button">7</button>
            </div>
        </div>
    );
};
export default WebSocketComponent;
