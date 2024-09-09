import {
    Button,
    Container,
    Table
  } from "reactstrap";
  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";
  
  export default function PlayerStadisticList() {
    const [rankingData, setRankingData] = useState([
      { name: "Jugador 1", matchesPlayed: 10, matchesWon: 7, timePlayed: "3:25" },
      { name: "Jugador 2", matchesPlayed: 15, matchesWon: 10, timePlayed: "5:10" },
      { name: "Jugador 3", matchesPlayed: 8, matchesWon: 4, timePlayed: "2:50" },
    ]);
  
    const [sortConfig, setSortConfig] = useState({ key: "matchesWon", direction: "desc" });
  
    const handleSort = (key) => {
      let direction = "asc";
      if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
      }
  
      const sortedData = [...rankingData].sort((a, b) => {
        if (key === "timePlayed") {
          // Convierte el tiempo en minutos para comparar
          const timeA = parseInt(a[key].split(":")[0]) * 60 + parseInt(a[key].split(":")[1]);
          const timeB = parseInt(b[key].split(":")[0]) * 60 + parseInt(b[key].split(":")[1]);
          return direction === "asc" ? timeA - timeB : timeB - timeA;
        }
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
      <div className="auth-page-purple">
        <Container style={{ marginTop: "15px" }} fluid>
          <h1 className="text-center">Estadísticas</h1>
          <div className="auth-page-yellow d-flex justify-content-center">
            <Button
              size="md"
              color="warning"
              tag={Link}
              to={`/statistics/personal`}
              className="mx-2"
            >
              Estadísticas Personales
            </Button>
            <Button
              size="md"
              color="warning"
              tag={Link}
              to={`/statistics/achievements`}
              className="mx-2"
            >
              Logros
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
          <h2 className="text-center">Ranking del Juego</h2>
          <Table bordered responsive>
            <thead >
              <tr>
                <th>#</th>
                <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                  Jugador {getSortArrow("name")}
                </th>
                <th onClick={() => handleSort("matchesPlayed")} style={{ cursor: "pointer" }}>
                  Partidas Jugadas {getSortArrow("matchesPlayed")}
                </th>
                <th onClick={() => handleSort("matchesWon")} style={{ cursor: "pointer" }}>
                  Partidas Ganadas {getSortArrow("matchesWon")}
                </th>
                <th onClick={() => handleSort("timePlayed")} style={{ cursor: "pointer" }}>
                  Tiempo Jugado {getSortArrow("timePlayed")}
                </th>
              </tr>
            </thead>
            <tbody>
              {rankingData.map((player, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{player.name}</td>
                  <td>{player.matchesPlayed}</td>
                  <td>{player.matchesWon}</td>
                  <td>{player.timePlayed}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
  