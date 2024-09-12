import {Button,Container,Row,Col} from "reactstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import tokenService from '../../services/token.service';

const user = tokenService.getUser();

export default function PlayerStadisticLogros(){
  

  const jwt = tokenService.getLocalAccessToken();
  const userId = user.id;
  const [logro1, set1] = useState(null);
  const [logro2, set2] = useState(null);
  const [logro3, set3] = useState(null);
  const [logro4, set4] = useState(null);

  useEffect(() => {
    const fetchLogro1 = async () => {
      try {
        const response = await fetch(`/api/v1/matches/juegaTuPrimeraPartida/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });        
        if (!response.ok) {
          throw new Error(`Error `);
        }
        const result = await response.json();
        set1(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchLogro1();
  }, [jwt, userId]);

  useEffect(() => {
    const fetchLogro2 = async () => {
      try {
        const response = await fetch(`/api/v1/matches/juega5partidas/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });        
        if (!response.ok) {
          throw new Error(`Error `);
        }
        const result = await response.json();
        set2(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchLogro2();
  }, [jwt, userId]);

  useEffect(() => {
    const logro3 = async () => {
      try {
        const response = await fetch(`/api/v1/matches/ganaPrimeraPartida/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });        
        if (!response.ok) {
          throw new Error(`Error `);
        }
        const result = await response.json();
        set3(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    logro3();
  }, [jwt,userId]);

  useEffect(() => {
    const logro4 = async () => {
      try {
        const response = await fetch(`/api/v1/matches/gana5partidas/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });        
        if (!response.ok) {
          throw new Error(`Error `);
        }
        const result = await response.json();
        set4(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    logro4();
  }, [jwt,userId]);

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
      <Container style={{ marginTop: "5px" }} fluid>
        <h1 className="text-center">Achievements</h1>
        <Row>
          <Col sm="6">
            <LogroBox>
              <p>Juega Tu Primera Partida: </p>
              <p>{logro1 ? "✔️" : "❌"}</p>
            </LogroBox>
          </Col>
          <Col sm="6">
            <LogroBox>
              <p>Juega 5 Partidas: </p>
              <p>{logro2 ? "✔️" : "❌"}</p>
            </LogroBox>
          </Col>
          <Col sm="6">
            <LogroBox>
              <p>Gana Tu Primera Partida: </p>
              <p>{logro3 ? "✔️" : "❌"}</p>
            </LogroBox>
          </Col>
          <Col sm="6">
            <LogroBox>
              <p>Gana 5 Partidas: </p>
              <p>{logro4 ? "✔️" : "❌"}</p>
            </LogroBox>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
