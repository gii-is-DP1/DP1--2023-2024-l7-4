import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import tokenService from '../../services/token.service';
import { useParams } from 'react-router-dom'; 


export default function PlayerStatistics() {
  const { username } = useParams();
  const jwt = tokenService.getLocalAccessToken();
  const [matchesList, setMatches] = useState(null);
  const [winMatchesList, setWinMatches] = useState(null);
  const [minutesPlayed, setMinutesPlayed] = useState(null);
  const [maxMinutesPlayed, setMaxMinutesPlayed] = useState(null);
  const [minMinutesPlayed, setMinMinutesPlayed] = useState(null);
  const [avgMinutesPlayed, setAvgMinutesPlayed] = useState(null);

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
    if (!username) return; 
    try {
      const response = await fetch(`/api/v1/matches/winMatchesPublic/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching win matches for ${username}`);
      }
      const result = await response.json();
      setWinMatches(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const listMinutes = async () => {
    if (!username) return; 
    try {
      const response = await fetch(`/api/v1/matches/timePlayedPublic/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching time played for ${username}`);
      }
      const result = await response.json();
      setMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const maxMinutes = async () => {
    if (!username) return; 
    try {
      const response = await fetch(`/api/v1/matches/maxTimePlayedPublic/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching max time played for ${username}`);
      }
      const result = await response.json();
      setMaxMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const minMinutes = async () => {
    try {
      const response = await fetch(`/api/v1/matches/minTimePlayedPublic/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching min time played for ${username}`);
      }
      const result = await response.json();
      setMinMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  const avgMinutes = async () => {
    if (!username) return; 
    try {
      const response = await fetch(`/api/v1/matches/avgTimePlayedPublic/${username}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching avg time played for ${username}`);
      }
      const result = await response.json();
      setAvgMinutesPlayed(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    listMatches();
    listWinMatches();
    avgMinutes();
    maxMinutes();
    minMinutes();
    listMinutes();
  }, [jwt, username]);


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
              <strong>Min Minutes in a Single Match:</strong>{" "}
              {minMinutesPlayed ? minMinutesPlayed : 0}
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

