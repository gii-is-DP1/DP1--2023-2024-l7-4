import "../static/css/auth/authButton.css";
import "../static/css/auth/authPage.css";
import FormGenerator from "../components/formGenerator/formGenerator";
import { useEffect, useRef, useState } from "react";
import { registerFormMatchInputs } from "./RegisterFormMatchInputs";
import tokenService from "../services/token.service";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import FormWithSoundButtonGenerator from "../components/formGenerator/formWithSoundButtonGenerator";


const jwt = tokenService.getLocalAccessToken();


export default function CreateMatch() {

  const [message, setMessage] = useState(null);
  const [stompClient, setStompClient] = useState(null);

  const username = tokenService.getUser().username;
  const creationFormRef = useRef();




  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      client.subscribe('/topic/messages', (message) => {
        const body = JSON.parse(message.body);
        setMessage(body.message);
      });

      setStompClient(client);
    });

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };

  }, []);





  function handleSubmit({ values }) {

    if (!creationFormRef.current.validate()) return;

    const request = {
      name: values.name,
      joinedPlayers: ([username]),
    };

    fetch("/api/v1/matches", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    }).then(function (response) {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
    })
      .then(function (data) {
        const id = data.id;
        if (stompClient && stompClient.connected) {
          stompClient.send('/app/match/messages', {}, JSON.stringify({
            type: 'CREATED',
            message: 'Match created'
          }));
        }
        window.location.href = (`/match/${id}/waitingRoom`);
      })
      .catch((message) => {
        alert(message);
      });
  }

  useEffect(() => {
  });

  return (
    <div className="auth-page-container">
      <div className="hero-div">
        <h1>START DUEL</h1>
        <div className="auth-form-container2">
          <FormWithSoundButtonGenerator
            ref={creationFormRef}
            inputs={
              registerFormMatchInputs
            }
            onSubmit={handleSubmit}
            numberOfColumns={1}
            listenEnterKey
            buttonText="FIRE!!"
          />
        </div>
      </div>
    </div>
  );

}