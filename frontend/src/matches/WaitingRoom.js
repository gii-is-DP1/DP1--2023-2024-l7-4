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

export default function WaitingRoom() {
    const id = getIdFromUrl(2);
    const jwt = tokenService.getLocalAccessToken();
    const username = jwtDecode(jwt).sub;
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [match, setMatch] = useFetchState(
        [],
        `/api/v1/matches/${id}`,
        jwt,
        setMessage,
        setVisible,
        id
    );
    const [joinedPlayers, setJoinedPlayers] = useState([]);
    const [waitingMessage, setWaitingMessage] = useState('Waiting for host starting the game...');


    useEffect(() => {
        
    setJoinedPlayers(match.joinedPlayers);
    // Limpia el intervalo cuando el componente se desmonta
   

  }, [match]);

  

  return (
      <div>
      <div className="admin-page-container">
      <div className="hero-div">
      <h1 className="text-center"> JOINED PLAYERS</h1>
      <div>
          <Table aria-label="achievements" className="mt-4">
              <thead>
                  <tr>  
                 <th className="text-center">  PLAYERS</th>
                  </tr>
              </thead>
              <tbody>{joinedPlayers}</tbody>
          </Table>
      </div>
      </div>
      </div>

      <div style={{ textAlign: 'center' }}>
      <Button outline color="success" >
          <Link to={`/`} className="btn sm"style={{ textDecoration: "none" }}>Go to Lobby</Link>
      </Button>
      </div>
      </div>
      
    );
}