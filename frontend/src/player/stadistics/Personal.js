import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Input,
    Row,
    Table,
  } from "reactstrap";
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
  const [playerList, setPlayers] = useState(null);


  useEffect(() => {
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
    listMatches();
  }, [jwt, username]);


  useEffect(() => {
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
    listWinMatches();
  }, [jwt, userId]);
  
  useEffect(() => {
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
    listMinutes();
  }, [jwt, userId]);





  const KhakiBox = ({ children }) => (
    <div style={{ backgroundColor: "khaki", padding: "15px", borderRadius: "8px", width: "80%", margin: "0 auto" }}>
      {children}
    </div>
);

    return(
        <div className="auth-page-purple ">
            <Container style={{ marginTop: "15px" }} fluid>
      <h1 className="text-center">Estadísticas</h1>
      <div className="auth-page-yellow">
        <Button
          size="md"
          color= "warning"
          tag={Link}
          to={`/statistics/personal`}
          >
            Estadísticas Personales
          </Button> 
      
          <Button
          size="md"
          color= "warning"
          tag={Link}
          to={`/statistics/achievements`}
          >
            Logros
          </Button> 
          </div>      
        </Container>
        <Container style={{ marginTop: "5px" }} fluid>
            <h1 className="text-center">Estadísticas Personales</h1>
        </Container>



        <KhakiBox>
                  <thead>
                      <tr>
                          <th width="20%">Número de partidas jugadas = {matchesList?matchesList.length:0} </th>
                          <th width="20%">Número de partidas ganadas = {winMatchesList?winMatchesList:0} </th>
                          <th width="20%">Minutos jugados = {minutesPlayed?minutesPlayed:0} </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                      </tr>
                  </tbody>
              </KhakiBox>      

</div>
);
}