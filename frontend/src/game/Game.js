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
    const [playerNumber, setPlayerNumber] = useState(null);
    const [timeoutId, setTimeoutId] = useState(-1);
    const [received, setReceived] = useState(false);

    //Jugador 0
    const [health0, setHealth0] = useState(2);
    const [bullets0, setBullets0] = useState(2);
    const [precision0, setPrecision0] = useState(2);
    const [cards0, setCards0] = useState([]);

    // Jugador 1
    const [health1, setHealth1] = useState(2);
    const [bullets1, setBullets1] = useState(2);
    const [precision1, setPrecision1] = useState(2);
    const [cards1, setCards1] = useState([]);

    //Cosas en comun
    const [deckOfCards, setDeckOfCards] = useState(generateUniqueRandomNumbers());
    const [cardsDiscard, setCardsDiscard] = useState(0);
    const [stompClient, setStompClient] = useState(null);
    const [cardsPlayed, setCardsPlayed] = useState(0);


    const matchId = getIdFromUrl(2);


    async function handleAssignPLayers() {
        await fetch(`/api/v1/matches/${matchId}`, {
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
            client.subscribe(`/topic/match/${matchId}/cards`, (message) => {
                const body = JSON.parse(message.body);
                if (body.type === 'DECKS') {
                    setDeckOfCards(body.deckCards);
                    setCards1(body.player1Cards);
                    setCards0(body.player0Cards);
                    if (!received && playerNumber === 0 && body.player1Cards.length !== 0) {
                        setReceived(true);
                    } else if (playerNumber === 1 && body.player1Cards.length === 0) {
                        const cardsPlayer1 = initialDeal(deckOfCards);
                        setCards1(cardsPlayer1);
                        setDeckOfCards(deckOfCards);
                        handleSendDeckMessage();
                    }
                }

            });
            setStompClient(client);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };

    }, [matchId, playerNumber]);


    useEffect(() => {
        let IDtimeout = null;
        if (stompClient && playerNumber === 0 && !received) {
            const cardsPlayer0 = initialDeal(deckOfCards);
            setCards0(cardsPlayer0);

            const sendDeckMessageRepeatedly = () => {
                handleSendDeckMessage();
                if (!received) {
                    IDtimeout = setTimeout(sendDeckMessageRepeatedly, 1000);
                    setTimeoutId(IDtimeout);
                }
            };

            sendDeckMessageRepeatedly();
        }

        return () => {
            if (IDtimeout) {
                clearTimeout(IDtimeout);
            }
        };
    }, [playerNumber, stompClient, received]);


    async function handleSendDeckMessage() {
        stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
            type: 'DECKS',
            deckCards: deckOfCards,
            player0Cards: cards0,
            player1Cards: cards1,
        }));
    }


    return (
        <div className="card-hand-grid">
            <h>{playerNumber}</h>
            <div className="top-row">
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
                />
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
                />
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
                />
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
                />
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
                />
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
                />
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
                />
                <CardButton
                    className="small-button"
                    imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}
                />
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
