import {Button,Container} from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PlayerStadisticList() {

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

    </div>
    </div>
  );
}
