import React, { useState } from 'react';
import tokenService from "../services/token.service";
import getIdFromUrl from "./../util/getIdFromUrl";
import { Link } from "react-router-dom";
const jwt = tokenService.getLocalAccessToken();

export default function CrearPartidaForm() {
    const id = getIdFromUrl(2);

  // Define el estado para los campos del formulario
  const [name, setName] = useState('');
  const [players, setPlayers] = useState('');
  const [critetios, setCriterios] = useState('');

  const emptyMatch = {
    id: id==="new"?null:id,
    name: "",
    players: "",
    criterios: "",
    };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();


  };

  return (
    <div>
      <h2>Crear Partida de Juego de Mesa</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre de la Partida:</label>
          <input
            required
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="players">Número de Jugadores:</label>
          <input
            required
            type="number"
            id="players"
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="criterios">criterios: </label>
          <input
            required
            type="number"
            id="criterios"
            value={critetios}
            onChange={(e) => setCriterios(e.target.value)}
          />
        </div>
        <div className="custom-button-row">
        <Link to={`/play/wait/${id}`} className="auth-button" style={{ textDecoration: "none" }}>Create Match</Link>
        </div>
      </form>
    </div>
  );
};


