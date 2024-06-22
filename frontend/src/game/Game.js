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



    //Cosas en comun
    const [deckOfCards, setDeckOfCards] = useState(generateUniqueRandomNumbers());
    const [cardsDiscard, setCardsDiscard] = useState(0);
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
                if (body.type === 'READY'){
                    setReceived(true)
                }

            });
            setStompClient(client);
        });

        return () => {
            if (client && client.connected) {
                client.disconnect();
            }
        };

    }, [matchId, playerNumber,received]);


    useEffect(() => {
        if (stompClient && playerNumber === 0 && received) {
            const cardsPlayer0 = initialDeal(deckOfCards);
            setCards0(cardsPlayer0);
            const cardsPlayer1 = initialDeal(deckOfCards)
            setCards1(cardsPlayer1)
            handleSendDeckMessage('DECKS');
        }
        if(playerNumber === 1 && !received){
            handleSendDeckMessage('RECEIVED');
        }


    }, [playerNumber, stompClient, received]);


    async function handleSendDeckMessage(type) {
        if (type === 'DECKS'){
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'DECKS',
                deckCards: deckOfCards,
                player0Cards: cards0,
                player1Cards: cards1,
            }));
        } else if (type === 'RECEIVED'){
            stompClient.send(`/app/match/${matchId}/cards`, {}, JSON.stringify({
                type: 'READY',
                message: 'RECEIVED'
            }));

        }

    }
    
    const handleMouseEnter = (imgSrc) => {
        setRightButtonImg(imgSrc)
    }
        
    const handleRendirte = () => {
        setShowConfirmationModal(false)
    }

    return (
        <div className="card-hand-grid">
            <h>{playerNumber}</h>
            <div className="top-row">
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}/>
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}/>
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}/>
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}/>
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}/>
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}/>
                <CardButton className="small-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}/>
            </div>
            <div className="middle-row">
                <CardButton className="left-button" imgSrc={`${process.env.PUBLIC_URL}/cards/backface.png`}/>
                <button className="middleleft-button">{playerNumber===0 ?(cardPlayed0?cardPlayed0:null) :(cardPlayed1?cardPlayed1:null)}</button>
                <button className="middlerigth-button">{playerNumber===1 ?(cardPlayed1?cardPlayed1:null) :(cardPlayed0?cardPlayed0:null)}</button>
                <CardButton className="rigth-button" imgSrc={rightButtonImg}/>
            </div>
            <div>{playerNumber===0? `HP: ${health0} Bullets: ${bullets0} Accuracy: ${precision0}` : `HP: ${health1} Bullets: ${bullets1} Accuracy: ${precision1}`}</div>
           {playerNumber === 0 ?
                <div className="bottom-row">
                <CardButton className="large-button" onClick={() =>setCardPlayed0(cards0[0])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[0]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[0]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed0(cards0[1])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[1]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[1]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed0(cards0[2])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[2]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[2]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed0(cards0[3])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[3]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[3]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed0(cards0[4])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[4]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[4]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed0(cards0[5])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[5]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[5]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed0(cards0[6])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards0[6]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards0[6]}.png`)}/>
                </div>
                :
                <div className="bottom-row">
                <CardButton className="large-button" onClick={() =>setCardPlayed1(cards1[0])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[0]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[0]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed1(cards1[1])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[1]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[1]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed1(cards1[2])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[2]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[2]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed1(cards1[3])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[3]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[3]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed1(cards1[4])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[4]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[4]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed1(cards1[5])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[5]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[5]}.png`)}/>
                <CardButton className="large-button" onClick={() =>setCardPlayed1(cards1[6])} imgSrc={`${process.env.PUBLIC_URL}/cards/card${cards1[6]}.png`} onMouseEnter={() => handleMouseEnter(`${process.env.PUBLIC_URL}/cards/card${cards1[6]}.png`)}/>
                </div>
                }




                <Modal isOpen={showConfirmationModal}>
                <ModalHeader>Rendirte</ModalHeader>
                <ModalBody>
                    ¿Quieres Rendirte?
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleRendirte}>Si</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};
export default WebSocketComponent;
