import "../static/css/auth/authButton.css";
import "../static/css/auth/authPage.css";
import FormGenerator from "../components/formGenerator/formGenerator";
import { useEffect, useRef, useState } from "react";
import { registerFormMatchInputs } from "./RegisterFormMatchInputs";
import jwt_decode from "jwt-decode";
import tokenService from "../services/token.service";
import useFetchState from "../util/useFetchState";


export default function CreationForm() {
  const jwt = tokenService.getLocalAccessToken();
  const username = tokenService.getUser().username;
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  
  const emptyItem = {
    id: null,
    nickname:"",
    username: "",
    password: "",
    authority: null,
  };
  const [jugador, setPlayer] = useFetchState(
    emptyItem,
    `/api/v1/players/username/${username}`,
    jwt,
    setMessage,
    setVisible,
    username
  );
  const creationFormRef = useRef();
  
  function handleSubmit({ values }) {

    if(!creationFormRef.current.validate()) return;

    const request = {
      name: values.name,
      matchTime: 0,
      nRounds: 0,
      maxPlayers: parseInt(values.players),
      scoreCrit: ["A1", "A2", "b1", "b2"],
      winner: "Null",
      creator: jugador,
      joinedPlayers: ([jugador.username]),
    };

    fetch("/api/v1/matches", {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(request),
    })
      .then(function (response) {
        if (response.status === 200) {
          const id = response.id;
          window.location.href = `/play/wait/${id}`;
              }
            })
            .catch((message) => {
              alert(message);
            });
        }

  useEffect(() => {
      });

    return (
    <div className="auth-page-container">
      <h1>Create Match</h1>
      <div className="auth-form-container">
        <FormGenerator
            ref={creationFormRef}
            inputs={
                registerFormMatchInputs
            }
            onSubmit={handleSubmit}
            numberOfColumns={1}
            listenEnterKey
            buttonText="Create Match"
            buttonClassName="auth-button"
          />
        </div>
      </div>
    );
  
}