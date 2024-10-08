import React, { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

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
    setChatMessages,
    setChooseCard,
    setShowConfirmationModal,
    tempCardPlayed,
    setTempCardPlayed,
    setPlayed,
    setTypePlayer,
    setShowAbandonedModal,
    setMatchPlayerList
}) => {



    useEffect(() => {
        if (tempCardPlayed !== null) {
            if (playerNumber === 0) {
                setStatePlayer1(prevState => ({
                    ...prevState,
                    cardPlayed: tempCardPlayed,
                    precisionBefore: prevState.precision,
                }));
            } else {
                setStatePlayer0(prevState => ({
                    ...prevState,
                    cardPlayed: tempCardPlayed,
                    precisionBefore: prevState.precision,
                }));
            }
            setWaiting(true);
            setShowCards(false);
            setTempCardPlayed(null);
        }
    }, [tempCardPlayed, playerNumber]);

    const handleAssignTypePlayer = async (username) => {
       const player = await fetch(`/api/v1/players/username/${username}`, {
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
        return player;
    }

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
                    setMatchPlayerList(matchPlayerList)
                    if (matchPlayerList.includes(username))
                        setPlayerNumber(Array.from(matchPlayerList).findIndex(value => value === username));
                    return matchPlayerList;
                }).then(matchPlayerList => {
                    return handleAssignTypePlayer(matchPlayerList[playerNumber]);
                }).then(player => setTypePlayer(player.profileType))
                .catch(error => {
                    console.error('Error fetching match:', error);
                });
        };

        if (matchId) handleAssignPlayers();

        const socket = new SockJS("http://localhost:8080/ws");
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
                        break;
                    case 'READY':
                        setDeckOfCards(body.deckCards);
                        setStatePlayer1(prevState => ({
                            ...prevState,
                            cards: body.player1Cards.length !== 0 ? body.player1Cards : prevState.cards,
                        }));
                        setStatePlayer0(prevState => ({
                            ...prevState,
                            cards: body.player0Cards.length !== 0 ? body.player0Cards : prevState.cards,
                        }));
                        if (playerNumber === 0 && body.player0Cards.length === 8) {
                            setReadyForDiscard(true);
                            setReceived(true);
                        }
                        else if (playerNumber === 1 && body.player1Cards.length === 8) {
                            setReadyForDiscard(true);
                            setReceived(true);
                        }
                        break;
                    case 'PLAYEDCARD':
                        if (playerNumber === 0 && body.playedCard1 !== -1) {
                            setTempCardPlayed(body.playedCard1);
                        } else if (playerNumber !== 1 && body.playedCard1 !== -1) {
                            setStatePlayer1(prevState => ({
                                ...prevState,
                                cardPlayed: body.playedCard1
                            }))
                        }
                        if (playerNumber === 1 && body.playedCard0 !== -1) {
                            setTempCardPlayed(body.playedCard0);
                        } else if (playerNumber !== 0 && body.playedCard0 !== -1) {
                            setStatePlayer0(prevState => ({
                                ...prevState,
                                cardPlayed: body.playedCard0
                            }))
                        }
                        break;
                    case 'CHOOSE':
                        if (body.playedCard0 > 0 && playerNumber === 0) {
                            setChooseCard(body.playedCard0);
                        } else if (body.playedCard1 > 0 && playerNumber === 1) {
                            setChooseCard(body.playedCard1);
                        }
                        break;
                    case 'PLAYERINFO':
                        setDeckOfCards(body.deckCards);
                        updatePlayers();
                        break;
                    case 'END':
                        setShowAbandonedModal(true);
                        break;
                    default:
                        break;
                }
            });

            client.subscribe(`/topic/chat/${matchId}`, (message) => {
                fetchChatMessages();
            });

            setStompClient(client);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };
    }, [matchId, playerNumber]);

    const updatePlayers = async () => {
        await fetch(`/api/v1/gunfighters/${matchId}/0`, {
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
            .then(player0 => {
                setStatePlayer0(
                    prevState => ({
                        ...prevState,
                        health: player0.health,
                        bullets: player0.bullets,
                        precision: player0.precision,
                        cards: player0.cards,
                    }));
                if (playerNumber === 0 && player0.cardPlayed === -1) {
                    setShowConfirmationModal(true);

                }
            })
            .catch(error => {
                console.error('Error fetching gunfighter:', error);
            });

        await fetch(`/api/v1/gunfighters/${matchId}/1`, {
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
            .then(player1 => {
                setStatePlayer1(
                    prevState => ({
                        ...prevState,
                        health: player1.health,
                        bullets: player1.bullets,
                        precision: player1.precision,
                        cards: player1.cards,
                    }));
                if (playerNumber === 1 && player1.cardPlayed === -1) {
                    setShowConfirmationModal(true);
                    setPlayed(false);

                }
            })
            .catch(error => {
                console.error('Error fetching gunfighter:', error);
            });
    };

    const fetchChatMessages = async () => {
        await fetch(`/api/v1/chats/${matchId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((chatMessages) => {
                setChatMessages(chatMessages);
            })
            .catch((error) => {
                console.error("Error fetching the chat:", error);
            });
    };

    return null;
};

export default WebSocketHandler;
