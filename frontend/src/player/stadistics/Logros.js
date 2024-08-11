import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Input,
    Row,
    Table,
  } from "reactstrap";
  import { Link } from "react-router-dom";
  import { useEffect, useState } from "react";
  import tokenService from '../../services/token.service';

  const user = tokenService.getUser();
export default function PlayerStadisticLogros(){

  const jwt = tokenService.getLocalAccessToken();
  const userId = user.id;
  const [logro1,set1] = useState(null);
  const [logro2,set2] = useState(null);
  const [logro3,set3] = useState(null);
  const [logro4,set4] = useState(null);
  const [logro5,set5] = useState(null);

  useEffect(() => {
    const logro1 = async () => {
      try {
        const response = await fetch(`/api/v1/games/juegaTuPrimeraPartida/${userId}`, {
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
    logro1();
  }, [jwt,userId]);

  useEffect(() => {
    const logro2 = async () => {
      try {
        const response = await fetch(`/api/v1/games/juega5partidas/${userId}`, {
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
    logro2();
  }, [jwt,userId]);

  useEffect(() => {
    const logro3 = async () => {
      try {
        const response = await fetch(`/api/v1/games/ganaPrimeraPartida/${userId}`, {
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
        const response = await fetch(`/api/v1/games/gana5partidas/${userId}`, {
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

  useEffect(() => {
    const logro5 = async () => {
      try {
        const response = await fetch(`/api/v1/games/juegaMasde100min/${userId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });        
        if (!response.ok) {
          throw new Error(`Error `);
        }
        const result = await response.json();
        set5(result);
      } catch (error) {
        console.error(error.message);
      }
    };
    logro5();
  }, [jwt,userId]);

  const KhakiBox = ({ children }) => (
    <div style={{ backgroundColor: "khaki", padding: "15px", borderRadius: "8px", width: "50%", margin: "0 auto" }}>
      {children}
    </div>
);

    return(
        <div className="auth-page-purple ">
            <Container style={{ marginTop: "15px" }} fluid>
      <h1 className="text-center">Estadísticas</h1>
      <div className="auth-page-yellow">
        <Button
          size="md"
          color= "warning"
          tag={Link}
          to={`/stadistics/personal`}
          >
            Estadísticas Personales
          </Button> 
          <Button
          size="md"
          color= "warning"
          tag={Link}
          to={`/stadistics/logros`}
          >
            Logros
          </Button> 
          </div>      
        </Container>
        <Container style={{ marginTop: "5px" }} fluid>
            <h1 className="text-center">Logros</h1>
        </Container>
        <KhakiBox>


                  <thead>
                      <tr>
                          <th align="center" >Juega Tu Primera Partida</th>
                          <th align="center">Juega 5 Partidas</th>
                          <th  align="center">Gana Primera Partida</th>
                          <th  align="center">Gana 5 Partidas</th>
                          <th  align="center">Juega Más de 100 min</th>
                          

                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td align="center">{logro1 ?  "✔️" : "❌"}</td>
                          <td align="center">{logro2 ?  "✔️" : "❌"}</td>
                          <td align="center">{logro3 ?  "✔️" : "❌"}</td>
                          <td align="center">{logro4 ?  "✔️" : "❌"}</td>
                          <td align="center">{logro5 ?  "✔️" : "❌"}</td>                         
                      </tr>
                  </tbody>
                  </KhakiBox>

  </div>
);
}