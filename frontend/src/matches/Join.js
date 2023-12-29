import React from 'react';
import '../App.css';
import '../static/css/home/home.css'; 
import tokenService from '../services/token.service';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import useFetchState from "../util/useFetchState";
import getIdFromUrl from "../util/getIdFromUrl";
import jwtDecode from 'jwt-decode';
import useFetchStatePlayers from '../util/useFetchStatePlayers';

export default function Join() {
    const id = getIdFromUrl(2);
    const jwt = tokenService.getLocalAccessToken();
    const username = jwtDecode(jwt).sub;
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false)
    const [match, setMatch] = useFetchStatePlayers(
        [],
        `/api/v1/matches/${id}`,
        jwt,
        setMessage,
        setVisible,
        id
    );
    const [waitingMessage, setWaitingMessage] = useState('Waiting for Jugador Activo...');

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (match.matchState !=="IN_PROGRESS"){
                setWaitingMessage('Waiting the other players...');
            }else {
                window.location.href = '/board';
                clearInterval(intervalId); // Detiene el intervalo cuando el juego está en progreso
                setWaitingMessage(''); // Limpia el mensaje de espera
            }
    }, 2000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [match.matchState]);

  const random = [];
  let intentos = 0;
  while (random.length < 4 && intentos < 1000000) {
      const criteriosA = ["A1", "A2", "A3", "A4", "A5", "A6"];
      const criteriosB = ["B1", "B2", "B3", "B4", "B5", "B6"];
      let criteriosAIndex = Math.floor(Math.random() * criteriosA.length);
      let criteriosBIndex = Math.floor(Math.random() * criteriosB.length);
      let criterioA = criteriosA[criteriosAIndex]
      let criterioB = criteriosB[criteriosBIndex]
      if (
      random.filter(cr => cr.includes("A")).length < 2 &&
      random.filter(cr => cr.includes("B")).length < 2 &&
      !random.includes(criterioA) && !random.includes(criterioB)

  ) {
      random.push(criterioA)
      random.push(criterioB)
  }

  intentos++;
}

  const matchPlayerList =  match.joinedPlayers;

  

  
    

    return (
        <div>
        <div className="admin-page-container">
        <h1 className="text-center"> JOINED PLAYERS</h1>
        <div>
            <Table aria-label="achievements" className="mt-4">
                <thead>
                    <tr>
        
                   <th className="text-center">  PLAYERS {match.joinedPlayers ? `${match.joinedPlayers.length}/${match.maxPlayers}` : 'Loading...'}</th>
                    </tr>
                </thead>
                <tbody>{matchPlayerList}</tbody>
            </Table>
            <div>
                <h1 className='text-center'>SCORING CRITERIA</h1>
                <th className='text-center'>{random}</th> 
                
            </div>
        </div>
        </div>
       
        <div style={{ textAlign: 'center' }}>
        {match.joinedPlayers ? (match.joinedPlayers.length=== match.maxPlayers ? (<Button outline color="success" >
            <Link to={`/board`} className="btn sm"style={{ textDecoration: "none" }}>Start Match</Link>
        </Button>) : "") : "Loading.."}

        </div>

        <div style={{ textAlign: 'center' }}>
        <Button outline color="success" >
            <Link to={`/`} className="btn sm"style={{ textDecoration: "none" }}>Go to Lobby</Link>
        </Button>
        </div>
        </div>
        
      );

    
      
}
