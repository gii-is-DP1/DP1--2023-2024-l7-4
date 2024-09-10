import { Button, Container, Table } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import tokenService from '../../services/token.service';

export default function PlayerStadisticList() {
  const jwt = tokenService.getLocalAccessToken();
  const user = tokenService.getUser();
  const username = user.username;
  const userId = user.id;

  // Asegúrate de que el estado inicial es un arreglo vacío.
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
      setRankingData(transformedData); // Aquí deberías obtener un arreglo del servidor
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    listPlayers();
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

      {/* Tabla del ranking */}
      <Container style={{ marginTop: "30px" }} fluid>
        <h2 className="text-center">Ranking del Juego</h2>
        <Table bordered responsive>
          <thead>
            <tr>
              <th>#</th>
              <th onClick={() => handleSort("name")} style={{ cursor: "pointer" }}>
                Jugador {getSortArrow("name")}
              </th>
              <th onClick={() => handleSort("matchesWon")} style={{ cursor: "pointer" }}>
                Partidas Ganadas {getSortArrow("matchesWon")}
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Iteramos directamente sobre rankingData, que debería ser un arreglo de objetos */}
            {rankingData.map((playerData, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{playerData.name}</td>
                <td>{playerData.matchesWon}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
