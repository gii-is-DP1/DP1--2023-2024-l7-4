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

export default function PlayerStadisticList(){
  const [message, setMessage] = useState(null);
  const [, set] = useState([]);
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
  </div>
  );
}