import React, { useEffect, useRef, useState } from 'react';
import { Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, Button } from 'reactstrap';
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
    const [received, setReceived] = useState(false);
    const [rightButtonImg, setRightButtonImg] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showCards, setShowCards] = useState(false);

    //Jugador 0
    const [health0, setHealth0] = useState(2);
    const [bullets0, setBullets0] = useState(3);
    const [precision0, setPrecision0] = useState(1);
    const [cards0, setCards0] = useState([]);
    const [cardPlayed0, setCardPlayed0] = useState(null);

    // Jugador 1
    const [health1, setHealth1] = useState(2);
    const [bullets1, setBullets1] = useState(1);
    const [precision1, setPrecision1] = useState(3);
    const [cards1, setCards1] = useState([]);
    const [cardPlayed1, setCardPlayed1] = useState(null);


    const [waiting, setWaiting] = useState(false); //Estado para saber si el otro jugador ya ha jugado
    const [played, setPlayed] = useState(false); //Estado para bloquear los botones una vez jugada una carta


    //Cosas en comun
    const [deckOfCards, setDeckOfCards] = useState(generateUniqueRandomNumbers());// Crea un array de números del 1 al 50);
    const [cardsDiscard, setCardsDiscard] = useState([]);
    const [stompClient, setStompClient] = useState(null);


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
                }
                if (body.type === 'READY') {
                    setReceived(true);
                }
                if (body.type === 'PLAYEDCARD') {
                    if (playerNumber === 0 && body.playedCard1 !== -1) {
                        setCardPlayed1(body.playedCard1);
                        setShowCards(false);
                        setWaiting(true);
                    }
                    if (playerNumber === 1 && body.playedCard0 !== -1) {
                        setCardPlayed0(body.playedCard0);
                        setShowCards(false);
                        setWaiting(true);
                    }
                }

            });
            setStompClient(client);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };

    }, [matchId, playerNumber]);


    useEffect(() => {
        let interval = null;
        if (stompClient && playerNumber === 0 && received && deckOfCards.length === 50) {
            console.log(deckOfCards);
            const cards = initialDeal(deckOfCards);
            setDeckOfCards(cards[0]);
            setCards0(cards[1]);
            setCards1(cards[2]);
        }
        if (playerNumber === 1 && !received) {
            interval = setInterval(() => {
                handleSendDeckMessage('RECEIVED')
            }, 1000);

        }
        return () => {
            clearInterval(interval);
        };
    }, [playerNumber, stompClient, received]);


    // Reparto inicial
    useEffect(() => {
        if (cards0.length > 0 && cards1.length > 0 && playerNumber === 0 && received) {
            handleSendDeckMessage('DECKS');
            setReceived(false);
        }
    }, [cards0, cards1]);


    // Confirmaciones del turno y realización de acciones
    useEffect(() => {
        if (cardPlayed0 > 0 && cardPlayed1 > 0 && played) {
            setShowCards(true);
            // HACER ACCIONES DE CARTAS
            setWaiting(false);
            setPlayed(false);
            setShowConfirmationModal(true);
        }
    }, [cardPlayed0, cardPlayed1, played]);



    const handleActionConfirmed = () => {
        setShowConfirmationModal(false);
        setShowCards(false);
        if (waiting) { //Se comprueba si ya ha recibido otra carta por pate del otro jugador, si es así entonces solo reseteamos la carta propia
            switch (playerNumber) {
                case 0:
                    setCardPlayed0(-1);
                    break;
                case 1:
                    setCardPlayed1(-1);
                    break;
                default:
                    break;
            }
        }
        else {
            setCardPlayed0(-1);
            setCardPlayed1(-1);
        }
    }

    async function handleSetCardPlayed(player, cardNumber) {
        if (player === 0 && !played) {
            await setCardPlayed0(cardNumber === 51 ? cardNumber : cards0[cardNumber]);
            handleSendDeckMessage('PLAYEDCARD', cardNumber === 51 ? cardNumber : cards0[cardNumber]);
            setPlayed(true);
        }
        if (player === 1 && !played) {
            await setCardPlayed1(cardNumber === 51 ? cardNumber : cards1[cardNumber]);
            handleSendDeckMessage('PLAYEDCARD', cardNumber === 51 ? cardNumber : cards1[cardNumber]);
            setPlayed(true);
        }
    }

    async function handleSendDeckMessage(type, cardNumber = -1) {
        if (type === 'DECKS') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'DECKS',
                deckCards: deckOfCards,
                player0Cards: cards0,
                player1Cards: cards1,
                playedCard0: -1,
                playedCard1: -1,
            }));
        } else if (type === 'RECEIVED') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'READY',
                message: 'RECEIVED'
            }));
        }
        if (type === 'PLAYEDCARD') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'PLAYEDCARD',
                deckCards: [],
                player0Cards: [],
                player1Cards: [],
                playedCard0: playerNumber === 0 ? cardNumber : -1,
                playedCard1: playerNumber === 1 ? cardNumber : -1,
            }));
        }
    }

    const handleMouseEnter = (imgSrc) => {
        setRightButtonImg(imgSrc)
    }

    return (
        <div className="card-hand-grid">
            <h>{playerNumber}</h>
            <div className="top-row">
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
            </div>
            {playerNumber === 0 &&
                <div className="middle-row">
                    <CardButton className="left-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middleleft-button" imgSrc={cardPlayed0 && cardPlayed0 !== -1 ? `${process.env.PUBLIC_URL}/cards/card${cardPlayed0}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middlerigth-button" imgSrc={cardPlayed1 && cardPlayed1 !== -1 && showCards ? `${process.env.PUBLIC_URL}/cards/card${cardPlayed1}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="rigth-button" imgSrc={rightButtonImg} />
                </div>
            }
            {playerNumber === 1 &&
                <div className="middle-row">
                    <CardButton className="left-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middleleft-button" imgSrc={cardPlayed1 && cardPlayed1 !== -1 ? `${process.env.PUBLIC_URL}/cards/card${cardPlayed1}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middlerigth-button" imgSrc={cardPlayed0 && cardPlayed0 !== -1 && showCards ? `${process.env.PUBLIC_URL}/cards/card${cardPlayed0}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="rigth-button" imgSrc={rightButtonImg} />
                </div>
            }
            <div>{playerNumber === 0 ? `HP: ${health0} Bullets: ${bullets0} Accuracy: ${precision0}` : `HP: ${health1} Bullets: ${bullets1} Accuracy: ${precision1}`}</div>
            {playerNumber === 0 ?
                <div className="bottom-row">
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(0, 0)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[0]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[0]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(0, 1)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[1]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[1]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(0, 2)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[2]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[2]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(0, 3)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[3]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[3]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(0, 4)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[4]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[4]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(0, 5)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[5]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[5]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(0, 6)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[6]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[6]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(0, 51)} imgSrc={`${process.env.PUBLIC_URL}/cards/card51.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card51.png`)} />
                </div>
                :
                <div className="bottom-row">
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(1, 0)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[0]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[0]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(1, 1)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[1]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[1]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(1, 2)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[2]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[2]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(1, 3)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[3]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[3]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(1, 4)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[4]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[4]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(1, 5)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[5]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[5]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(1, 6)} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[6]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[6]}.png`)} />
                    <CardButton className="large-button" onClick={() => handleSetCardPlayed(1, 51)} imgSrc={`${process.env.PUBLIC_URL}/cards/card51.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card51.png`)} />
                </div>
            }


            <Modal isOpen={showConfirmationModal}>
                <ModalHeader>Acciones realizadas</ModalHeader>
                <ModalBody>
                    Confirmar turno
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleActionConfirmed}>Confirmar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default WebSocketComponent;
