import React, { useEffect, useRef, useState } from 'react';
import { Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, Button, Card } from 'reactstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import getIdFromUrl from "../util/getIdFromUrl";
import tokenService from '../services/token.service';
import jwtDecode from 'jwt-decode';
import '../static/css/GameBoard.css';
import '../static/css/playerStats.css';
import CardButton from '../components/buttons/cardButton';
import { generateNewRandomNumbers, generateUniqueRandomNumbers, initialDeal } from '../util/game/utils'
import DiscardCardsModalContent from '../components/modals/DiscardCardsModalContent';
import CardRow from '../components/modals/CardRow';
import TopRow from '../components/modals/TopRow';
import PlayerStats from '../util/game/playerStatsModal';



const WebSocketComponent = () => {
    const jwt = tokenService.getLocalAccessToken();
    const username = jwt ? jwtDecode(jwt).sub : "null";
    const [playerNumber, setPlayerNumber] = useState(null);
    const [received, setReceived] = useState(false);
    const [rightButtonImg, setRightButtonImg] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [showCards, setShowCards] = useState(false);

    //Jugador 0
    const [statePlayer0, setStatePlayer0] = useState({
        health: 2,
        bullets: 2,
        precision: 2,
        cards: [],
        cardPlayed: null,
    })

    // Jugador 1
    const [statePlayer1, setStatePlayer1] = useState({
        health: 2,
        bullets: 2,
        precision: 2,
        cards: [],
        cardPlayed: null,
    })


    const [waiting, setWaiting] = useState(false); //Estado para saber si el otro jugador ya ha jugado
    const [played, setPlayed] = useState(false); //Estado para bloquear los botones una vez jugada una carta
    const [readyForDiscard, setReadyForDiscard] = useState(false);
    const [discardedCards, setDiscardedCards] = useState([]);

    //Cosas en comun
    const [deckOfCards, setDeckOfCards] = useState(generateUniqueRandomNumbers());// Crea un array de números del 1 al 50);
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
                    setStatePlayer1(prevState => ({
                        ...prevState,
                        cards: body.player1Cards,
                    }));
                    setStatePlayer0(prevState => ({
                        ...prevState,
                        cards: body.player0Cards,
                    }));
                    if (playerNumber === 1 && body.player1Cards.length === 8) {
                        setReadyForDiscard(true);
                    }
                }
                if (body.type === 'READY') {
                    setReceived(true);
                }
                if (body.type === 'PLAYEDCARD') {
                    if (playerNumber === 0 && body.playedCard1 !== -1) {
                        setStatePlayer1(prevState => ({
                            ...prevState,
                            cardPlayed: body.playedCard1,
                        }));
                        setShowCards(false);
                        setWaiting(true);
                    }
                    if (playerNumber === 1 && body.playedCard0 !== -1) {
                        setStatePlayer0(prevState => ({
                            ...prevState,
                            cardPlayed: body.playedCard0,
                        }));
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
            setStatePlayer1(prevState => ({
                ...prevState,
                cards: cards[1]
            }));
            setStatePlayer0(prevState => ({
                ...prevState,
                cards: cards[2]
            }));
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


    // Reparto inicial ya que en el otro useEffect no se mandaba a tiempo
    useEffect(() => {
        if (statePlayer0.cards.length > 0 && statePlayer1.cards.length > 0 && playerNumber === 0 && received) {
            handleSendDeckMessage('DECKS');
            setReadyForDiscard(true);
            setReceived(false);
        }
    }, [statePlayer0.cards, statePlayer1.cards]);


    // Confirmaciones del turno y realización de acciones
    useEffect(() => {
        if (statePlayer0.cardPlayed > 0 && statePlayer1.cardPlayed > 0 && played) {
            setShowCards(true);
            //if (playerNumber === 0) actionCard(cardPlayed0, cardPlayed1, statePlayer);
            // HACER ACCIONES DE CARTAS
            setWaiting(false);
            setPlayed(false);
            setShowConfirmationModal(true);
        }
    }, [statePlayer0.cardPlayed, statePlayer1.cardPlayed, played]);


    // Rebarajar las cartas una vez que se acaben las cartas del mazo
    useEffect(() => {
        if (deckOfCards.length < 1)
            setDeckOfCards(generateNewRandomNumbers(statePlayer0.cards, statePlayer1.cards));
    }, [deckOfCards]);

    const handleActionConfirmed = () => {
        setShowConfirmationModal(false);
        setShowCards(false);
        if (waiting) { //Se comprueba si ya ha recibido otra carta por parte del otro jugador, si es así entonces solo reseteamos la carta propia
            switch (playerNumber) {
                case 0:
                    setStatePlayer0(prevState => ({
                        ...prevState,
                        cardPlayed: -1,
                    }));
                    break;
                case 1:
                    setStatePlayer1(prevState => ({
                        ...prevState,
                        cardPlayed: -1,
                    }));
                    break;
                default:
                    break;
            }
        } else {
            setStatePlayer0(prevState => ({
                ...prevState,
                cardPlayed: -1,
            }));
            setStatePlayer1(prevState => ({
                ...prevState,
                cardPlayed: -1,
            }));
        }
    };

    const handleDiscardConfirmed = () => {
        if (playerNumber === 0) {
            setStatePlayer0(prevState => ({
                ...prevState,
                cards: prevState.cards.filter((card) => !discardedCards.includes(card)),
            }));
        } else {
            setStatePlayer1(prevState => ({
                ...prevState,
                cards: prevState.cards.filter((card) => !discardedCards.includes(card)),
            }));
        }
        setDiscardedCards([]);
        setShowDiscardModal(false);
        setReadyForDiscard(false);
    };
    

    async function handleSetCardPlayed(player, cardIndex) {
        if (player === 0 && !played && !readyForDiscard) {
            const card = cardIndex === 51 ? cardIndex : statePlayer0.cards[cardIndex];
            await setStatePlayer0((prevState) => ({
                ...prevState,
                cardPlayed: card,
            }));
            handleSendDeckMessage('PLAYEDCARD', card);
            setPlayed(true);
        }
        if (player === 1 && !played && !readyForDiscard) {
            const card = cardIndex === 51 ? cardIndex : statePlayer1.cards[cardIndex];
            await setStatePlayer1((prevState) => ({
                ...prevState,
                cardPlayed: card,
            }));
            handleSendDeckMessage('PLAYEDCARD', card);
            setPlayed(true);
        }
    };

    async function handleSendDeckMessage(type, cardNumber = -1) {
        if (type === 'DECKS') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'DECKS',
                deckCards: deckOfCards,
                player0Cards: statePlayer0.cards,
                player1Cards: statePlayer1.cards,
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
    };

    async function handleSetDiscardCard(player, cardNumber) {
        const card = player === 0 ? statePlayer0.cards[cardNumber] : statePlayer1.cards[cardNumber];
        setDiscardedCards((prevDiscardedCards) => {
            const index = prevDiscardedCards.indexOf(card);

            if (index !== -1) {
                return prevDiscardedCards.filter((_, i) => i !== index);
            } else if (prevDiscardedCards.length < 2) {
                return [...prevDiscardedCards, card];
            } else {
                return prevDiscardedCards;
            }
        });
    };


    const handleMouseEnter = (imgSrc) => {
        setRightButtonImg(imgSrc)
    };

    return (
        <div className="card-hand-grid">
            <PlayerStats health={playerNumber === 0 ? statePlayer1.health : statePlayer0.health} bullets={playerNumber === 0 ? statePlayer1.bullets : statePlayer0.bullets} precision={playerNumber === 0 ? statePlayer1.precision : statePlayer0.precision} />
            <TopRow />
            {playerNumber === 0 &&
                <div className="middle-row">
                    <CardButton className="left-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middleleft-button" imgSrc={statePlayer0.cardPlayed && statePlayer0.cardPlayed !== -1 ? `${process.env.PUBLIC_URL}/cards/card${statePlayer0.cardPlayed}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middlerigth-button" imgSrc={statePlayer1.cardPlayed && statePlayer1.cardPlayed !== -1 && showCards ? `${process.env.PUBLIC_URL}/cards/card${statePlayer1.cardPlayed}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="rigth-button" imgSrc={rightButtonImg} />
                </div>
            }
            {playerNumber === 1 &&
                <div className="middle-row">
                    <CardButton className="left-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middleleft-button" imgSrc={statePlayer1.cardPlayed && statePlayer1.cardPlayed !== -1 ? `${process.env.PUBLIC_URL}/cards/card${statePlayer1.cardPlayed}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middlerigth-button" imgSrc={statePlayer0.cardPlayed && statePlayer0.cardPlayed !== -1 && showCards ? `${process.env.PUBLIC_URL}/cards/card${statePlayer0.cardPlayed}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="rigth-button" imgSrc={rightButtonImg} />
                </div>
            }
            <PlayerStats health={playerNumber === 0 ? statePlayer0.health : statePlayer1.health} bullets={playerNumber === 0 ? statePlayer0.bullets : statePlayer1.bullets} precision={playerNumber === 0 ? statePlayer0.precision : statePlayer1.precision} />
            <CardRow player={playerNumber} cards={playerNumber === 0 ? statePlayer0.cards : statePlayer1.cards} handleSetCardPlayed={handleSetCardPlayed} handleMouseEnter={handleMouseEnter} />
            <Modal isOpen={showConfirmationModal}>
                <ModalHeader>Acciones realizadas</ModalHeader>
                <ModalBody>
                    Confirmar turno
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleActionConfirmed}>Confirmar</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={readyForDiscard}>
                <ModalHeader>Descarta dos cartas</ModalHeader>
                <ModalBody>
                    {playerNumber === 0 ? (
                        <DiscardCardsModalContent
                            cards={statePlayer0.cards}
                            discardedCards={discardedCards}
                            handleSetDiscardCard={(index) => handleSetDiscardCard(0, index)}
                            handleMouseEnter={handleMouseEnter}
                        />
                    ) : (
                        <DiscardCardsModalContent
                            cards={statePlayer1.cards}
                            discardedCards={discardedCards}
                            handleSetDiscardCard={(index) => handleSetDiscardCard(1, index)}
                            handleMouseEnter={handleMouseEnter}
                        />
                    )}
                </ModalBody>
                <ModalFooter>
                    {discardedCards.length === 2 && (<Button color="danger" onClick={handleDiscardConfirmed}>Descartar</Button>)}
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default WebSocketComponent;
