import {
    Button
    } from "reactstrap";
import { Link } from "react-router-dom"; 

export default function playSelect() {
  return (
  <div>
     <div className="admin-page-container">
        <h1 className="text-center">Create or join?</h1>
      </div>
    <div className="admin-page-container">
      <Button outline color="success"> 
          <Link 
            to={`/play/create`}   className="btn"                
            style={{ textDecoration: "none" }}>CREATE</Link> 
        </Button> 
        </div>
        <div className="admin-page-container">
      <Button outline color="success"> 
          <Link 
            to={`/play/matches`}   className="btn sm"                
            style={{ textDecoration: "none" }}>JOIN</Link> 
        </Button> 
        </div>
    </div>
  );
}
