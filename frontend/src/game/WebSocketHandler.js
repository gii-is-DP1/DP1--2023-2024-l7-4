import React, { useEffect } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const WebSocketHandler = ({
    username,
    jwt,
    matchId,
    playerNumber,
    setPlayerNumber,
    setDeckOfCards,
    setStatePlayer0,
    setStatePlayer1,
    setReadyForDiscard,
    setReceived,
    setShowCards,
    setWaiting,
    setStompClient,
    setChooseCard,
}) => {

    useEffect(() => {
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

        if (matchId) handleAssignPlayers();

        const socket = new SockJS('http://localhost:8080/ws');
        const client = Stomp.over(socket);

        client.connect({}, () => {
            client.subscribe(`/topic/match/${matchId}/cards`, (message) => {
                const body = JSON.parse(message.body);
                switch (body.type) {
                    case 'DECKS':
                        setDeckOfCards(body.deckCards);
                        setStatePlayer1(prevState => ({
                            ...prevState,
                            cards: body.player1Cards.length !== 0 ? body.player1Cards : prevState.cards,
                        }));
                        setStatePlayer0(prevState => ({
                            ...prevState,
                            cards: body.player0Cards.length !== 0 ? body.player0Cards : prevState.cards,
                        }));
                        if (playerNumber === 1 && body.player1Cards.length === 8) {
                            setReadyForDiscard(true);
                            setReceived(true);
                        }
                        break;
                    case 'READY':
                        setReceived(true);
                        break;
                    case 'PLAYEDCARD':
                        if (playerNumber === 0 && body.playedCard1 !== -1) {
                            setStatePlayer1(prevState => {
                                return {
                                    ...prevState,
                                    cardPlayedBefore: prevState.cardPlayed,
                                    cardPlayed: body.playedCard1,
                                    precisionBefore: prevState.precision,
                                };
                            });
                            setShowCards(false);
                            setWaiting(true);
                        }
                        if (playerNumber === 1 && body.playedCard0 !== -1) {
                            setStatePlayer0(prevState => {
                                return {
                                    ...prevState,
                                    cardPlayedBefore: prevState.cardPlayed,
                                    cardPlayed: body.playedCard0,
                                    precisionBefore: prevState.precision,
                                };
                            });
                            setShowCards(false);
                            setWaiting(true);
                        }
                        break;
                    case 'CHOOSE':
                        if (body.cardPlayed0 > 0 && playerNumber === 0) {
                            setChooseCard(body.cardPlayed0);
                        } else if (body.cardPlayed1 > 0 && playerNumber === 1) {
                            setChooseCard(body.cardPlayed1);
                        }
                        break;
                    default:
                        break;
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

    return null;
};

export default WebSocketHandler;
