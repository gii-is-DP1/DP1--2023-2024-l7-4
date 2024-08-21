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

  useEffect(() => {
    const logro1 = async () => {
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
    logro1();
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
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td align="center">{logro1 ?  "✔️" : "❌"}</td>                      
                      </tr>
                  </tbody>
                  </KhakiBox>

  </div>
);
}