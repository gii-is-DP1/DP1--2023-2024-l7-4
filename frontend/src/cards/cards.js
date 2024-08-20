import "../static/css/auth/authButton.css";
import "../static/css/auth/authPage.css";
import { useEffect, useRef, useState } from "react";
import tokenService from "../services/token.service";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const jwt = tokenService.getLocalAccessToken();


// !!!!!!NOT USING

export default function CardGame() {
  const [message, setMessage] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [playerHand, setPlayerHand] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);

  const username = tokenService.getUser().username;

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/cards', (message) => {
        const body = JSON.parse(message.body);
        showCard(body);
      });

      setStompClient(client);
    });

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []);

  async function drawCard() {
    try {
      const response = await fetch("/api/v1/cards/draw", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error al robar carta: ${response.statusText}`);
      }
      const newCard = await response.json();
      setPlayerHand(prevHand => [...prevHand, newCard]);
    } catch (error) {
      alert(error.message);
    }
  }

  function playCard() {
    if (playerHand.length === 0) {
      alert("No tienes cartas para jugar.");
      return;
    }

    const card = playerHand[0];
    setPlayerHand(playerHand.slice(1));
    stompClient.send("/app/playCard", {}, JSON.stringify(card));
  }

   function discardCard(index) {
    const cardToDiscard = playerHand[index];
    setPlayerHand(prevHand => prevHand.filter((_, i) => i !== index));
    setDiscardPile(prevPile => [...prevPile, cardToDiscard]);
    stompClient.send("/app/discardCard", {}, JSON.stringify(cardToDiscard));
  }

  function showCard(card) {
    alert(`Carta jugada: ${card.nombre}\nAcción: ${card.action}`);
  }

  function updateHandDisplay() {
    return playerHand.map((card, index) => (
      <div key={index}>
        <p><strong>Name:</strong> {card.nombre}</p>
        <p><strong>Action:</strong> {card.action}</p>
        <p><strong>Value:</strong> {card.value}</p>
        <p><strong>Category:</strong> {card.category}</p>
        <p><strong>Bullet:</strong> {card.bullet}</p>
        <p><strong>Accuracy:</strong> {card.accuracy}</p>
        <p><strong>Discart:</strong> {card.discart.toString()}</p>
        <button onClick={() => discardCard(index)}>Discard</button>
      </div>
    ));
  }

  return (
    <div className="auth-page-container">
      <div className="hero-div">
        <h1>CARD GAME</h1>
        <div className="auth-form-container2">
          <button onClick={drawCard}>Draw Card</button>
          <button onClick={playCard}>Play Card</button>
          <div id="card-info">
            {updateHandDisplay()}
          </div>
        </div>
      </div>
    </div>
  );
}