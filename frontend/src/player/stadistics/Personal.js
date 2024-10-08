import {Button,Container} from "reactstrap";
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
  const [maxCardPlayed, setMaxCardPlayed]= useState(null)
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
  const maxCard = async () => {
    try {
      const response = await fetch(`/api/v1/matches/maxCardPlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error   ${userId}`);
      }
      const result = await response.json();
      setMaxCardPlayed(result.maxCard);
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
    maxCard();
  }, [jwt, userId]);

  useEffect(() => {
    listMatches();
  }, [jwt, username]);



  const KhakiBox = ({ children }) => (
    <div style={{ backgroundColor: "khaki", padding: "15px", borderRadius: "8px", width: "100%", margin: "0 auto", textAlign:"left" }}>
      {children}
    </div>
);

return (
  <div className='admin-page-container'>
          <div className="hero-div">
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
      <h1 className="text-center">Personal Statistics</h1>
    </Container>

    <KhakiBox>
      <div><strong>• Matches played:</strong> {matchesList ? matchesList.length : 0}</div>
      <div><strong>• Matches won:</strong> {winMatchesList ? winMatchesList : 0}</div>
      <div><strong>• Played time:</strong> {minutesPlayed ? minutesPlayed+" m" : 0}</div>
      <div><strong>• Your match with more time played was about:</strong> {maxMinutesPlayed ? maxMinutesPlayed+" m" : 0}</div>
      <div><strong>• Your match with less time played was about:</strong> {minMinutesPlayed ? minMinutesPlayed+" m" : 0}</div>
      <div><strong>• Your games usually last:</strong> {avgMinutesPlayed ? avgMinutesPlayed+" m" : 0}</div>
      <div><strong>• Your most played enemy:</strong> {maxPlayerPlayed ? maxPlayerPlayed : "You need to play"}</div>
      <div><strong>• Your favorite card:</strong> {maxCardPlayed ? (<img src={`${process.env.PUBLIC_URL}/cards/card${maxCardPlayed}.png`} />) : "You need to play"}</div>

    </KhakiBox>
  </div>
  </div>
);
}