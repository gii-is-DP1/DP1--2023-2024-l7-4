import { Button, Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import tokenService from '../../services/token.service';

const user = tokenService.getUser();

export default function PlayerStadisticLogros() {
  const jwt = tokenService.getLocalAccessToken();
  const userId = user.id;
  
  const [achievements, setAchievements] = useState([]);
  const [successMap, setSuccessMap] = useState({});


  const fetchAchievements = async () => {
    try {
      const response = await fetch(`/api/v1/achievements`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al obtener logros`);
      }
      const result = await response.json();
      setAchievements(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error(error.message);
    }
  };

  const checkSuccess = async (achievementId) => {
    try {
      const response = await fetch(`/api/v1/achievements/${userId}/${achievementId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error al verificar logro`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  };

  useEffect(() => {
    const verifyAchievements = async () => {
      const newSuccessMap = {};
      for (const achievement of achievements) {
        const isSuccess = await checkSuccess(achievement.id);
        newSuccessMap[achievement.id] = isSuccess;
      }
      setSuccessMap(newSuccessMap);
    };

    if (achievements.length > 0) {
      verifyAchievements();
    }
  }, [achievements]);

  useEffect(() => {
    fetchAchievements();
  }, [jwt, userId]);

  const LogroBox = ({ children }) => (
    <div style={{
      backgroundColor: "khaki",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      marginBottom: "20px",
      minHeight: "100px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
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
        <h1 className="text-center">Achievements</h1>
        <Row>
          {achievements.length > 0 ? (
            achievements.map((achievement) => (
              <Col sm="6" key={achievement.id}>
                <LogroBox>
                <p>{achievement.name}</p>
                <p>{successMap[achievement.id] ? "✔️" : "❌"}</p>
                </LogroBox>
              </Col>
            ))
          ) : (
            <p>No achievements found</p>
          )}
        </Row>
      </Container>
    </div>
  );
}
