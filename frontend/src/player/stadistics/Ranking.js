import { Button, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import tokenService from '../../services/token.service';

export default function PlayerStadisticList() {
  const jwt = tokenService.getLocalAccessToken();
  const user = tokenService.getUser();
  const username = user.username;
  const userId = user.id;


  const [rankingData, setRankingData] = useState([]);


  const listPlayers = async () => {
    try {
      const response = await fetch(`/api/v1/matches/winners`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching winners for user ${userId}`);
      }
      const result = await response.json();

   
      const transformedData = Object.entries(result).map(([name, matchesWon]) => ({
        name,
        matchesWon
      }));

      return transformedData;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };


  const listTimesPlayed = async () => {
    try {
      const response = await fetch(`/api/v1/matches/timePlayed`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error fetching time played for user ${userId}`);
      }
      const result = await response.json();


      const transformedData = Object.entries(result).map(([name, timePlayed]) => ({
        name,
        timePlayed
      }));

      return transformedData;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  };

  const combineData = async () => {
    const playersData = await listPlayers();
    const timesData = await listTimesPlayed();


    const timesMap = timesData.reduce((acc, curr) => {
      acc[curr.name] = curr.timePlayed;
      return acc;
    }, {});


    const combinedData = playersData.map(playerData => ({
      ...playerData,
      timePlayed: timesMap[playerData.name] || 0 
    }));

    setRankingData(combinedData);
  };


  useEffect(() => {
    combineData();
  }, [jwt, username]);

  const [sortConfig, setSortConfig] = useState({ key: "matchesWon", direction: "desc" });

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sortedData = [...rankingData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setRankingData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "";
  };

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

        {/* Tabla del ranking */}
        <Container style={{ marginTop: "30px" }} fluid>
          <h1 className="text-center">Ranking</h1>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>#</th>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                  Player {getSortArrow("name")}
                </th>
                <th onClick={() => handleSort("matchesWon")} style={{ cursor: "pointer" }}>
                  Win Matches {getSortArrow("matchesWon")}
                </th>
                <th onClick={() => handleSort("timePlayed")} style={{ cursor: "pointer" }}>
                 Played Time (min) {getSortArrow("timePlayed")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rankingData.map((playerData, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{playerData.name}</td>
                  <td>{playerData.matchesWon}</td>
                  <td>{playerData.timePlayed}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    </div>
  );
}
