import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import tokenService from '../../services/token.service';
import { useParams } from 'react-router-dom'; 


export default function PlayerStatistics() {
  const { username } = useParams();
  const jwt = tokenService.getLocalAccessToken();

  const [userId, setUserId] = useState(null);
  const [matchesList, setMatches] = useState(null);
  const [winMatchesList, setWinMatches] = useState(null);
  const [minutesPlayed, setMinutesPlayed] = useState(null);
  const [maxMinutesPlayed, setMaxMinutesPlayed] = useState(null);
  const [avgMinutesPlayed, setAvgMinutesPlayed] = useState(null);
  const [error, setError] = useState(null);

  const fetchPlayerId = async () => {
    try {
      const response = await fetch(`/api/v1/players/public/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching player ID for ${username}`);
      }
      const playerData = await response.json();
      setUserId(playerData.id); 
    } catch (error) {
      setError(error.message);
    }
  };

  const listMatches = async () => {
    try {
      const response = await fetch(`/api/v1/matches/player/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching matches for ${username}`);
      }
      const result = await response.json();
      setMatches(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const listWinMatches = async () => {
    if (!userId) return; 
    try {
      const response = await fetch(`/api/v1/matches/winMatches/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching win matches for ${userId}`);
      }
      const result = await response.json();
      setWinMatches(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const listMinutes = async () => {
    if (!userId) return; 
    try {
      const response = await fetch(`/api/v1/matches/timePlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching time played for ${userId}`);
      }
      const result = await response.json();
      setMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const maxMinutes = async () => {
    if (!userId) return; 
    try {
      const response = await fetch(`/api/v1/matches/maxTimePlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching max time played for ${userId}`);
      }
      const result = await response.json();
      setMaxMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const avgMinutes = async () => {
    if (!userId) return; 
    try {
      const response = await fetch(`/api/v1/matches/avgTimePlayed/${userId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching avg time played for ${userId}`);
      }
      const result = await response.json();
      setAvgMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPlayerId(); 
  }, [jwt, username]);


  useEffect(() => {
    if (userId) {
      avgMinutes();
      maxMinutes();
      listMinutes();
      listWinMatches();
    }
  }, [jwt, userId]);

  useEffect(() => {
    listMatches();
  }, [jwt, username]);

  if (error) {
    return <p>Error: {error}</p>;
  }


  return (
    <div className="auth-page-container">
        <div className="hero-div">
        <h1 className="text-center">{username} Statistics</h1>
            <div>
              <strong>Total Matches Played:</strong>{" "}
              {matchesList ? matchesList.length : 0}
            </div>
            <div>
              <strong>Total Matches Won:</strong>{" "}
              {winMatchesList ? winMatchesList : 0}
            </div>
            <div>
              <strong>Total Minutes Played:</strong>{" "}
              {minutesPlayed ? minutesPlayed : 0}
            </div>
            <div>
              <strong>Max Minutes in a Single Match:</strong>{" "}
              {maxMinutesPlayed ? maxMinutesPlayed : 0}
            </div>
            <div>
              <strong>Average Minutes per Match:</strong>{" "}
              {avgMinutesPlayed ? avgMinutesPlayed : 0}
            </div>
            <div className="custom-button-row">
                <Link 
                    to={`/players/${username}`}
                    className="button-container-bad">Back
                </Link>
            </div>
      </div>
    </div>
  );
}

