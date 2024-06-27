import React, { useEffect, useState } from 'react';
import { Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader, Input, Button, Card } from 'reactstrap';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import getIdFromUrl from "../util/getIdFromUrl";
import tokenService from '../services/token.service';
import jwtDecode from 'jwt-decode';
import '../static/css/GameBoard.css';
import '../static/css/playerStats.css';
import CardButton from '../components/buttons/cardButton';
import { generateNewRandomNumbers, generateUniqueRandomNumbers, initialDeal } from '../util/game/utils';
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

    const [statePlayer0, setStatePlayer0] = useState({
        health: 2,
        bullets: 2,
        precision: 2,
        cards: [],
        cardPlayed: null,
    });

    const [statePlayer1, setStatePlayer1] = useState({
        health: 2,
        bullets: 2,
        precision: 2,
        cards: [],
        cardPlayed: null,
    });

    const [waiting, setWaiting] = useState(false);
    const [played, setPlayed] = useState(false);
    const [updatePlayers, setUpdatePlayers] = useState(false);
    const [readyForDiscard, setReadyForDiscard] = useState(false);
    const [discardedCards, setDiscardedCards] = useState([]);

    const [deckOfCards, setDeckOfCards] = useState(generateUniqueRandomNumbers());
    const [stompClient, setStompClient] = useState(null);

    const matchId = getIdFromUrl(2);

    const handleAssignPlayers = async () => {
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
        .then(match => match.joinedPlayers)
        .then(matchPlayerList => {
            setPlayerNumber(Array.from(matchPlayerList).findIndex(value => value === username));
        })
        .catch(error => {
            console.error('Error fetching match:', error);
        });
    };

    useEffect(() => {
        if (matchId) handleAssignPlayers();

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

            client.subscribe(`/topic/match/${matchId}/players`, (message) => {
                const body = JSON.parse(message.body);
                if (body.type === 'PLAYERINFO') {
                    if (body.playerNumber === 1) {
                        setStatePlayer1(prevState => ({
                            ...prevState,
                            health: body.health,
                            bullets: body.bullets,
                            precision: body.precision,
                        }));
                    }
                    if (body.playerNumber === 0) {
                        setStatePlayer0(prevState => ({
                            ...prevState,
                            health: body.health,
                            bullets: body.bullets,
                            precision: body.precision,
                        }));
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
                handleSendDeckMessage('RECEIVED');
            }, 1000);
        }
        return () => {
            clearInterval(interval);
        };
    }, [playerNumber, stompClient, received]);

    useEffect(() => {
        if (statePlayer0.cards.length > 0 && statePlayer1.cards.length > 0 && playerNumber === 0 && received) {
            handleSendDeckMessage('DECKS');
            setReadyForDiscard(true);
            setReceived(false);
        }
    }, [statePlayer0.cards, statePlayer1.cards]);

    useEffect(() => {
        if (deckOfCards.length < 1)
            setDeckOfCards(generateNewRandomNumbers(statePlayer0.cards, statePlayer1.cards));
    }, [deckOfCards]);

    useEffect(() => {
        if (statePlayer0.cardPlayed > 0 && statePlayer1.cardPlayed > 0 && played) {
            setShowCards(true);
            if (playerNumber === 0)
                handleActionCard(statePlayer0.cardPlayed, statePlayer1.cardPlayed);
            setWaiting(false);
            setPlayed(false);
            setShowConfirmationModal(true);
            setUpdatePlayers(true);
        }
    }, [statePlayer0.cardPlayed, statePlayer1.cardPlayed, played]);

    useEffect(() => {
        if (statePlayer0.cardPlayed > 0 && statePlayer1.cardPlayed > 0 && updatePlayers) {
            handleSendPlayerUpdate(0, statePlayer0);
            handleSendPlayerUpdate(1, statePlayer1);
            setUpdatePlayers(false);
        }
    }, [statePlayer0.cardPlayed, statePlayer1.cardPlayed, updatePlayers]);

    const handleActionCard = (cardNumber0, cardNumber1) => {
        if (cardNumber0 === 51) {
            setStatePlayer0(prevState => ({
                ...prevState,
                health: prevState.health - 1,
                bullets: prevState.bullets + 1,
            }));
        }
        if (cardNumber1 === 51) {
            setStatePlayer1(prevState => ({
                ...prevState,
                health: prevState.health - 1,
                bullets: prevState.bullets + 1,
            }));
        }
    };

    const handleActionConfirmed = () => {
        setShowConfirmationModal(false);
        setShowCards(false);
        if (waiting) {
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

    const handleSetCardPlayed = async (player, cardIndex) => {
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

    const handleSendDeckMessage = (type, cardNumber = -1) => {
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
        } else if (type === 'PLAYEDCARD') {
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

    const handleSendPlayerUpdate = (playerNumber, playerState) => {
        stompClient.send(`/app/match/${matchId}/players`, {}, JSON.stringify({
            type: 'PLAYERINFO',
            health: playerState.health,
            bullets: playerState.bullets,
            precision: playerState.precision,
            playerNumber: playerNumber,
        }));
    };

    const handleSetDiscardCard = (player, cardNumber) => {
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
        setRightButtonImg(imgSrc);
    };

    return (
        <div className="card-hand-grid">
            <PlayerStats health={playerNumber === 0 ? statePlayer1.health : statePlayer0.health} bullets={playerNumber === 0 ? statePlayer1.bullets : statePlayer0.bullets} precision={playerNumber === 0 ? statePlayer1.precision : statePlayer0.precision} />
            <TopRow />
            {playerNumber === 0 &&
                <div className="middle-row">
                    <CardButton className="left-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middleleft-button" imgSrc={statePlayer0.cardPlayed && statePlayer0.cardPlayed !== -1 ? `${process.env.PUBLIC_URL}/cards/card${statePlayer0.cardPlayed}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middleright-button" imgSrc={statePlayer1.cardPlayed && statePlayer1.cardPlayed !== -1 && showCards ? `${process.env.PUBLIC_URL}/cards/card${statePlayer1.cardPlayed}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="right-button" imgSrc={rightButtonImg} />
                </div>
            }
            {playerNumber === 1 &&
                <div className="middle-row">
                    <CardButton className="left-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middleleft-button" imgSrc={statePlayer1.cardPlayed && statePlayer1.cardPlayed !== -1 ? `${process.env.PUBLIC_URL}/cards/card${statePlayer1.cardPlayed}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="middleright-button" imgSrc={statePlayer0.cardPlayed && statePlayer0.cardPlayed !== -1 && showCards ? `${process.env.PUBLIC_URL}/cards/card${statePlayer0.cardPlayed}.png` : `${process.env.PUBLIC_URL}/cards/backface.png`} />
                    <CardButton className="right-button" imgSrc={rightButtonImg} />
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
