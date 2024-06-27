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
    const [health0, setHealth0] = useState(2);
    const [bullets0, setBullets0] = useState(2);
    const [precision0, setPrecision0] = useState(2);
    const [cards0, setCards0] = useState([]);
    const [cardPlayed0, setCardPlayed0] = useState(null);

    // Jugador 1
    const [health1, setHealth1] = useState(2);
    const [bullets1, setBullets1] = useState(2);
    const [precision1, setPrecision1] = useState(2);
    const [cards1, setCards1] = useState([]);
    const [cardPlayed1, setCardPlayed1] = useState(null);


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
                    setCards1(body.player1Cards);
                    setCards0(body.player0Cards);
                    if (playerNumber === 1 && body.player1Cards.length === 8)
                        setReadyForDiscard(true);
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


    // Reparto inicial ya que en el otro useEffect no se mandaba a tiempo
    useEffect(() => {
        if (cards0.length > 0 && cards1.length > 0 && playerNumber === 0 && received) {
            handleSendDeckMessage('DECKS');
            setReadyForDiscard(true);
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


    // Rebarajar las cartas una vez que se acaben las cartas del mazo
    useEffect(() => {
        if (deckOfCards.length < 1)
            setDeckOfCards(generateNewRandomNumbers(cards0, cards1));
    }, [deckOfCards]);

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

    const handleDiscardConfirmed = () => {
        if (playerNumber === 0) {
            setCards0((prevCards0) => {
                return prevCards0.filter((card) => !discardedCards.includes(card));
            });
        } else {
            setCards1((prevCards1) => {
                return prevCards1.filter((card) => !discardedCards.includes(card));
            });
        }
        setDiscardedCards([]);
        setShowDiscardModal(false);
        setReadyForDiscard(false);
    }

    async function handleSetCardPlayed(player, cardNumber) {
        if (player === 0 && !played && !readyForDiscard) {
            await setCardPlayed0(cardNumber === 51 ? cardNumber : cards0[cardNumber]);
            handleSendDeckMessage('PLAYEDCARD', cardNumber === 51 ? cardNumber : cards0[cardNumber]);
            setPlayed(true);
        }
        if (player === 1 && !played && !readyForDiscard) {
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

    async function handleSetDiscardCard(player, cardNumber) {
        const card = player === 0 ? cards0[cardNumber] : cards1[cardNumber];
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
    }


    const handleMouseEnter = (imgSrc) => {
        setRightButtonImg(imgSrc)
    }

    return (
        <div className="card-hand-grid">
            <PlayerStats health={playerNumber === 0 ? health1 : health0} bullets={playerNumber === 0 ? bullets1 : bullets0} precision={playerNumber === 0 ? precision1 : precision0} />
            <TopRow />
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
            <PlayerStats health={playerNumber === 0 ? health0 : health1} bullets={playerNumber === 0 ? bullets0 : bullets1} precision={playerNumber === 0 ? precision0 : precision1} />
            <CardRow player={playerNumber} cards={playerNumber === 0 ? cards0 : cards1} handleSetCardPlayed={handleSetCardPlayed} handleMouseEnter={handleMouseEnter} />
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
                            cards={cards0}
                            discardedCards={discardedCards}
                            handleSetDiscardCard={(index) => handleSetDiscardCard(0, index)}
                            handleMouseEnter={handleMouseEnter}
                        />
                    ) : (
                        <DiscardCardsModalContent
                            cards={cards1}
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
