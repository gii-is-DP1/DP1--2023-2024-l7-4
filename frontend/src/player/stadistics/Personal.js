import {Button,ButtonGroup,Col,Container,Input,Row,Table} from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import tokenService from '../../services/token.service';

import useFetchState from "../../util/useFetchState";

  const user = tokenService.getUser();
  
export default function PlayerStadisticPersonal(){
  const jwt = tokenService.getLocalAccessToken();
  const username = user.username;
  const userId = user.id;


  const [matchesList, setMatches] = useState(null);
  const [winMatchesList, setWinMatches] = useState(null);
  const [minutesPlayed, setMinutesPlayed] = useState(null);
  const [maxMinutesPlayed, setMaxMinutesPlayed] = useState(null);
  const [minMinutesPlayed, setMinMinutesPlayed] = useState(null);
  const [avgMinutesPlayed, setAvgMinutesPlayed] = useState(null);
  const [playerList, setPlayers] = useState(null);
  const [maxPlayerPlayed, setMaxPlayerPlayed] = useState(null);

  const listMatches = async () => {
    try {
      const response = await fetch(`/api/v1/matches/player/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error   ${username}`);
      }
      const result = await response.json();
      setMatches(result);
    } catch (error) {
      console.error(error.message);
    }
  };  
  const listWinMatches = async () => {
    try {
      const response = await fetch(`/api/v1/matches/winMatches/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error   ${userId}`);
      }
      const result = await response.json();
      setWinMatches(result);
    } catch (error) {
      console.error(error.message);
    }
  };  
  const listMinutes = async () => {
    try {
      const response = await fetch(`/api/v1/matches/timePlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error   ${userId}`);
      }
      const result = await response.json();
      setMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };  
  const maxMinutes = async () => {
    try {
      const response = await fetch(`/api/v1/matches/maxTimePlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error   ${userId}`);
      }
      const result = await response.json();
      setMaxMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };  
  const avgMinutes = async () => {
    try {
      const response = await fetch(`/api/v1/matches/avgTimePlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error   ${userId}`);
      }
      const result = await response.json();
      setAvgMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  }; 
  const minMinutes = async () => {
    try {
      const response = await fetch(`/api/v1/matches/minTimePlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error   ${userId}`);
      }
      const result = await response.json();
      setMinMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };  
  const maxPlayer = async () => {
    try {
      const response = await fetch(`/api/v1/matches/maxPlayerPlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error   ${userId}`);
      }
      const result = await response.json();
      setMaxPlayerPlayed(result.maxPlayer);
    } catch (error) {
      console.error(error.message);
    }
  };  
  useEffect(() => {
    avgMinutes();
    minMinutes();
    maxMinutes();
    listMinutes();
    listWinMatches();
    maxPlayer();
  }, [jwt, userId]);

  useEffect(() => {
    listMatches();
  }, [jwt, username]);



  const KhakiBox = ({ children }) => (
    <div style={{ backgroundColor: "khaki", padding: "15px", borderRadius: "8px", width: "80%", margin: "0 auto" }}>
      {children}
    </div>
);

return (
  <div className="auth-page-purple">
      <Container style={{ marginTop: "15px" }} fluid>
          <h1 className="text-center">Statistics</h1>
          <div className="auth-page-yellow d-flex justify-content-center">
            <Button
              size="md"
              color="warning"
              tag={Link}
              to={`/statistics/personal`}
              className="mx-2"
            >
              Personal statistics
            </Button>
            <Button
              size="md"
              color="warning"
              tag={Link}
              to={`/statistics/achievements`}
              className="mx-2"
            >
              Achievements
            </Button>
            <Button
              size="md"
              color="warning"
              tag={Link}
              to={`/statistics/ranking`}
              className="mx-2"
            >
              Ranking
            </Button>
          </div>
        </Container>

    <Container style={{ marginTop: "5px" }} fluid>
      <h1 className="text-center">Estadísticas Personales</h1>
    </Container>

    <KhakiBox>
      <div><strong>Número de partidas jugadas:</strong> {matchesList ? matchesList.length : 0}</div>
      <div><strong>Número de partidas ganadas:</strong> {winMatchesList ? winMatchesList : 0}</div>
      <div><strong>Minutos jugados:</strong> {minutesPlayed ? minutesPlayed : 0}</div>
      <div><strong>Máximo minutos jugados:</strong> {maxMinutesPlayed ? maxMinutesPlayed : 0}</div>
      <div><strong>Mínimo minutos jugados:</strong> {minMinutesPlayed ? minMinutesPlayed : 0}</div>
      <div><strong>Media de minutos jugados por partida:</strong> {avgMinutesPlayed ? avgMinutesPlayed : 0}</div>
      <div><strong>Porcentaje de victoria:</strong> {avgMinutesPlayed ? avgMinutesPlayed : 0}</div>
      <div><strong>Tu rival favorito:</strong> {maxPlayerPlayed ? maxPlayerPlayed : 0}</div>

    </KhakiBox>
  </div>
);
}