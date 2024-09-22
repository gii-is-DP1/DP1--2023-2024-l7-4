import React, { useEffect, useState } from 'react';
import getIdFromUrl from "../util/getIdFromUrl";
import tokenService from '../services/token.service';
import jwtDecode from 'jwt-decode';
import '../static/css/GameBoard.css';
import '../static/css/playerStats.css';
import CardButton from '../components/buttons/cardButton';
import CardRow from '../components/modals/CardRow';
import TopRow from '../components/modals/TopRow';
import PlayerStats from '../util/game/playerStatsModal';
import GameModals from '../components/modals/GameModals';
import WebSocketHandler from './WebSocketHandler';
import { useLocation } from 'react-router-dom';


const WebSocketComponent = () => {
    const jwt = tokenService.getLocalAccessToken();
    const username = jwt ? jwtDecode(jwt).sub : "null";
    const [playerNumber, setPlayerNumber] = useState(null);
    const [received, setReceived] = useState(false);
    const [rightButtonImg, setRightButtonImg] = useState('');
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [showEndModal, setShowEndModal] = useState(false);
    const [chooseCard, setChooseCard] = useState(0);
    const [tempCardPlayed, setTempCardPlayed] = useState(0);
    const [showConfirmationDiscardToPrevent, setShowConfirmationDiscardToPrevent] = useState(false);

    const [statePlayer0, setStatePlayer0] = useState({
        health: 2,
        bullets: 2,
        precision: 2,
        cards: [],
        cardPlayed: null,
        playerNumber: 0,
    });

    const [statePlayer1, setStatePlayer1] = useState({
        health: 2,
        bullets: 2,
        precision: 2,
        cards: [],
        cardPlayed: null,
        playerNumber: 1,
    });

    const [waiting, setWaiting] = useState(false);
    const [played, setPlayed] = useState(false);
    const [readyForDiscard, setReadyForDiscard] = useState(false);
    const [discardedCards, setDiscardedCards] = useState([]);

    const [deckOfCards, setDeckOfCards] = useState([]);
    const [stompClient, setStompClient] = useState(null);

    const matchId = getIdFromUrl(2);


    //UseEffect inicial para recibir las cartas
    useEffect(() => {
        if (!received)
            handleSendDeckMessage('READY');
    }, [stompClient, received]);


    useEffect(() => {
        if (waiting)
            setShowCards(false);
    }, [waiting])


    
    //Acciones 
    useEffect(() => {
        if (statePlayer0.cardPlayed > 0 && statePlayer1.cardPlayed > 0 && played) {
            setShowCards(true);
            setWaiting(false);
        }
    }, [statePlayer0.cardPlayed, statePlayer1.cardPlayed, played]);

    
    //Accionar el final de partida
    useEffect(() => {
        if (statePlayer0.health < 1 || statePlayer1.health < 1) {
            setShowConfirmationModal(false);
            setShowEndModal(true);
        }

    }, [statePlayer0.health, statePlayer1.health]);


    useEffect(() => {
        if (!readyForDiscard && discardedCards.length === 0 && (statePlayer0.cards.length === 6 || statePlayer1.cards.length === 6)) {
            if (playerNumber === 0) {
                handleSendDeckMessage('CUSTOM', 0);
            } else {
                handleSendDeckMessage('CUSTOM', 1);
            }
        }
    }, [readyForDiscard]);

    const handleActionConfirmed = async () => {
        setShowConfirmationModal(false);
        setShowCards(false);
        setPlayed(false);
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
        setReadyForDiscard(false);
    };

    const handleSetCardPlayed = async (player, cardIndex) => {
        if (player === 0 && !played && !readyForDiscard) {
            const card = cardIndex === 51 ? cardIndex : statePlayer0.cards[cardIndex];
            await setStatePlayer0((prevState) => ({
                ...prevState,
                cardPlayed: card,
                precisionBefore: prevState.precision,
            }));
            if (card === 30) {
                setShowConfirmationDiscardToPrevent(true);
            }
            else {
                handleSendDeckMessage('PLAYEDCARD', card);
            }
            setPlayed(true);
        }
        if (player === 1 && !played && !readyForDiscard) {
            const card = cardIndex === 51 ? cardIndex : statePlayer1.cards[cardIndex];
            await setStatePlayer1((prevState) => ({
                ...prevState,
                cardPlayed: card,
                precisionBefore: prevState.precision,
            }));
            if (card === 30) {
                setShowConfirmationDiscardToPrevent(true);
            }
            else {
                handleSendDeckMessage('PLAYEDCARD', card);
            }
            setPlayed(true);
        }
    };

    const handleSendDeckMessage = (type, cardNumber = -1) => {
        if (!stompClient) {
            console.error('stompClient is not initialized');
            return;
        }
        if (type === 'DECKS') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'DECKS',
                deckCards: deckOfCards,
                player0Cards: statePlayer0.cards,
                player1Cards: statePlayer1.cards,
                playedCard0: -1,
                playedCard1: -1,
            }));
        } else if (type === 'READY') {
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
        } else if (type === 'PLAYEDCARD30') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'PLAYEDCARD',
                deckCards: [],
                player0Cards: playerNumber === 0 ? [-1, -1] : [],
                player1Cards: playerNumber === 1 ? [-1, -1] : [],
                playedCard0: playerNumber === 0 ? cardNumber : -1,
                playedCard1: playerNumber === 1 ? cardNumber : -1,
            }));
        } else if (type === 'CUSTOM') {
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'DECKS',
                deckCards: deckOfCards,
                player0Cards: playerNumber === 0 ? statePlayer0.cards : Array.of(),
                player1Cards: playerNumber === 1 ? statePlayer1.cards : Array.of(),
                playedCard0: -1,
                playedCard1: -1,
            }));
        }
    };

    const handleGoToLobby = () => {
        if (playerNumber === 0) {
            if (statePlayer0.health < 1)
                window.location.href = ('/');
            else
                handleSetMatchWinner(username);
        } else {
            if (statePlayer1.health < 1)
                window.location.href = ('/');
            else
                handleSetMatchWinner(username);
        }
    };

    const intimidationCardInHand = (cards) => {
        if (cards.includes(45)) {
            return true;
        }
    }

    const handleSetMatchWinner = async (playerUsername) => {
        try {
            const response = await fetch(`/api/v1/matches/${matchId}/winner`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${jwt}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: `${playerUsername}`
            })
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            window.location.href = '/';
        } catch (error) {
            console.error('Error setting the winner:', error);
        }
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
            <WebSocketHandler
                username={username}
                jwt={jwt}
                matchId={matchId}
                playerNumber={playerNumber}
                setPlayerNumber={setPlayerNumber}
                setDeckOfCards={setDeckOfCards}
                setStatePlayer0={setStatePlayer0}
                setStatePlayer1={setStatePlayer1}
                setReadyForDiscard={setReadyForDiscard}
                setReceived={setReceived}
                setShowCards={setShowCards}
                setPlayed={setPlayed}
                setWaiting={setWaiting}
                setStompClient={setStompClient}
                setChooseCard={setChooseCard}
                setShowConfirmationModal={setShowConfirmationModal}
                tempCardPlayed={tempCardPlayed}
                setTempCardPlayed={setTempCardPlayed}
            />
            <PlayerStats health={playerNumber === 0 ? statePlayer1.health : statePlayer0.health} bullets={playerNumber === 0 ? statePlayer1.bullets : statePlayer0.bullets} precision={playerNumber === 0 ? statePlayer1.precision : statePlayer0.precision} />
            {playerNumber === 0 ?

                (intimidationCardInHand(statePlayer1.cards) ? <h>'THE ENEMY HAS THE INTIMIDATION CARD!!' </h> : '')
                :
                (intimidationCardInHand(statePlayer0.cards) ? <h>'THE ENEMY HAS THE INTIMIDATION CARD!!' </h> : '')

            }
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
            <GameModals
                showConfirmationModal={showConfirmationModal && chooseCard === 0}
                handleActionConfirmed={handleActionConfirmed}
                readyForDiscard={readyForDiscard}
                playerNumber={playerNumber}
                statePlayer0={statePlayer0}
                statePlayer1={statePlayer1}
                setStatePlayer0={setStatePlayer0}
                setStatePlayer1={setStatePlayer1}
                discardedCards={discardedCards}
                handleSetDiscardCard={handleSetDiscardCard}
                handleMouseEnter={handleMouseEnter}
                handleDiscardConfirmed={handleDiscardConfirmed}
                showEndModal={showEndModal}
                handleGoToLobby={handleGoToLobby}
                chooseCard={chooseCard}
                setChooseCard={setChooseCard}
                deckOfCards={deckOfCards}
                setDeckOfCards={setDeckOfCards}
                handleSendDeckMessage={handleSendDeckMessage}
                showConfirmationDiscardToPrevent={showConfirmationDiscardToPrevent}
                setShowConfirmationDiscardToPrevent={setShowConfirmationDiscardToPrevent}
            />
        </div>
    );
};

export default WebSocketComponent;