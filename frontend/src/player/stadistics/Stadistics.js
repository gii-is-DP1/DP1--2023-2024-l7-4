import {Button,Container,Row,Col} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PlayerStadisticList() {
  const [, set] = useState([]);

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

    </div>
  );
}
