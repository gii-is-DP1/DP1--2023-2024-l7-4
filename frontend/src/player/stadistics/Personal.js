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

  import useFetchState from "../../util/useFetchState";

  const user = tokenService.getUser();
  
export default function PlayerStadisticPersonal(){
  const jwt = tokenService.getLocalAccessToken();
  const username = user.username;


  const [matchesList, setMatches] = useState(null);
  const [playerList, setPlayers] = useState(null);


  

  //Mostrar Lista de partidas
  useEffect(() => {
    const listMatches = async () => {
      try {
        const response = await fetch(`/api/v1/matches/player/${username}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        if (!response.ok) {
          throw new Error(`Error   ${username}`);
        }
        const result = await response.json();
        setMatches(result);
      } catch (error) {
        console.error(error.message);
      }
    };  
    listMatches();
  }, [jwt, username]);
  





  const KhakiBox = ({ children }) => (
    <div style={{ backgroundColor: "khaki", padding: "15px", borderRadius: "8px", width: "80%", margin: "0 auto" }}>
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
            <h1 className="text-center">Estadísticas Personales</h1>
        </Container>



        <KhakiBox>
                  <thead>
                      <tr>
                          <th width="20%">Número de partidas jugadas = {matchesList.size} </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                      </tr>
                  </tbody>
              </KhakiBox>      

</div>
);
}