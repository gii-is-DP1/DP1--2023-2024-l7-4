import React, { useEffect, useRef, useState } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import getIdFromUrl from "../util/getIdFromUrl";
import tokenService from '../services/token.service';
import jwtDecode from 'jwt-decode';
import '../static/css/GameBoard.css';
import CardButton from '../components/buttons/cardButton';
import { generateUniqueRandomNumbers, initialDeal } from '../util/game/utils'

const WebSocketComponent = () => {
    const jwt = tokenService.getLocalAccessToken();
    const username = jwt ? jwtDecode(jwt).sub : "null";
    const [playerNumber, setPlayerNumber] = useState(-1);

    //Jugador 1
    const [health0, setHealth0] = useState(2);
    const [bullets0, setBullets0] = useState(2);
    const [precision0, setPrecision0] = useState(2);
    const [cards0, setCards0] = useState(0);

    // Jugador 2
    const [health1, setHealth1] = useState(2);
    const [bullets1, setBullets1] = useState(2);
    const [precision1, setPrecision1] = useState(2);
    const [cards1, setCards1] = useState(0);

    //Cosas en comun
    const [deckOfCards, setDeckOfCards] = useState(generateUniqueRandomNumbers());
    const [cardsDiscard, setCardsDiscard] = useState(0);
    const [stompClient, setStompClient] = useState(null);
    const [cardsPlayed, setCardsPlayed] = useState(0);

    let initial = true;

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
            .then(match => { return match.joinedPlayers; }).then((matchPlayerList) => {
                setPlayerNumber(Array.from(matchPlayerList).findIndex(value => value === username));
            })
            .catch(error => { console.error('Error fetching match:', error); return null; });


    }

    useEffect(() => {

        if (matchId)
            handleAssignPLayers();

        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe(`/topic/${matchId}/cards`, (message) => {
                const body = message.body;
                if (body.type === 'DECK') {
                    setDeckOfCards(body.cards);
                    if (initial){
                        const cardsPlayer1 = initialDeal(deckOfCards);
                        setCards1(cardsPlayer1);
                        initial = !initial;
                    }
                } else if (body.type === 'DECK0') {
                    setCards0(body.cards);
                } else if (body.type === 'DECK1') {
                    setCards1(body.cards);
                }
            });
            setStompClient(client);
        });

        if (initial && playerNumber === 0 && deckOfCards.length === 50) {
            const cardsPlayer0 = initialDeal(deckOfCards);
            setCards0(cardsPlayer0);
            initial = false;
            handleSendDeckMessage('DECK');
            handleSendDeckMessage('DECK0');
        }


        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };
    }, [playerNumber]);


    
    async function handleSendDeckMessage(type) {

        if (type === 'DECK') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: type,
                cards: deckOfCards,
            }));
        }
        else if (type === 'DECK0') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: type,
                cards: cards0,
            }));
        }
        else if (type === 'DECK1') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type:  type,
                cards: cards1,
            }));
        }
    }

    async function handleSendMessage(type) {
        //Mensaje por cada accion

        if (type === 'DECK') {
            stompClient.send(`/app/match/${matchId}/game`, {}, JSON.stringify({
                type: type,
                message: 'Baraja'
            }));
        }
        else if (type === 'Player2') {
            stompClient.send(`/app/match/${matchId}/game`, {}, JSON.stringify({
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

    /*
    const handleUpdatePlayerMine = (event) => {
        event.preventDefault();
        if (stompClient && stompClient.connected) {
            stompClient.send('/app/gunfighter', {}, JSON.stringify({
                
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

*/

    const handleInputChange = (setter) => (event) => {
        const value = event.target.value;
        setter(value === '' ? 0 : parseInt(value, 10));
    };

    return (
        <div className="card-hand-grid">
            <h>{playerNumber}</h>
            <div className="top-row">
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/card1.png`}
                />
                <button className="small-button">2</button>
                <button className="small-button">3</button>
                <button className="small-button">4</button>
                <button className="small-button">5</button>
                <button className="small-button">6</button>
                <button className="small-button">7</button>
            </div>
            <div className="middle-row">
                <button className="left-button">1</button>
                <button className="middleleft-button">2</button>
                <button className="middlerigth-button">3</button>
                <button className="rigth-button">4</button>
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
