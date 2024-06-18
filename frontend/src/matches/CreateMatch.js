import "../static/css/auth/authButton.css";
import "../static/css/auth/authPage.css";
import FormGenerator from "../components/formGenerator/formGenerator";
import { useEffect, useRef, useState } from "react";
import { registerFormMatchInputs } from "./RegisterFormMatchInputs";
import tokenService from "../services/token.service";

const jwt = tokenService.getLocalAccessToken();


export default function CreationForm() {

  const username = tokenService.getUser().username;
  const creationFormRef = useRef();


  function handleSubmit({ values }) {

    if(!creationFormRef.current.validate()) return;

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
      window.location.href = `/match/${id}/waitingRoom`;
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