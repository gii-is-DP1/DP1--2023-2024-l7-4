import React from 'react';
import '../App.css';
import '../static/css/home/home.css'; 
import logo from '../static/images/desembarco_del_rey.jpg';
import tokenService from '../services/token.service';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";
import useFetchState from "../util/useFetchState";
import jwtDecode from 'jwt-decode';
import useFetchStateMatches from '../util/useFetchStateMatches';

const jwt = tokenService.getLocalAccessToken();

export default function Home(){
    const username = jwt?jwtDecode(jwt).sub:"null";
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [matches, setMatches] = useFetchStateMatches(
        [],
        `/api/v1/matches?open=true`,
        jwt,
        setMessage,
        setVisible
    );

    if(!jwt){
        return(
            <div className="home-page-container">
                <div className="hero-div">
                    <h1>LosMapasDelReino</h1>
                    <h3>---</h3>
                    <h3>BIENVENIDO CONSTRUCTOR</h3>                
                </div>
            </div>
        );
        }else {

            const matchesList =  matches.map((m) => {
            return (<tr key={m.id}>
                <td className="text-center"> {m.name}</td>
                <td className="text-center"> {m.joinedPlayers.length + "/" + m.maxPlayers} </td>
                <td className='text-center'>{m.matchState}</td>
                <td className="text-center">
                {m.matchState === "OPEN" && (<Button outline color="success" size='sm' onClick = { () => {
                    fetch('/api/v1/matches/' + m.id + "/join", {
                    method: 'PUT',
                        headers: {
                        "Authorization": `Bearer ${jwt}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(username),
                    })}}>
            <Link to={`/mymatches/${m.id}/join`} className="btn btn-sm" style={{ textDecoration: "none" }}>JOIN</Link> 
        </Button>)}
      </td>
      </tr>
      );
});

    return (
        <div>
        <div className="admin-page-container">
        <div className="hero-div">
        <h1 className="text-center"> ONLINE GAMES</h1>
        <div>
            <Table aria-label="achievements" className="mt-4">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>PLAYERS</th>
                        <th>STATE</th> 
                        <th>PLAY</th>
                    </tr>
                </thead>
                <tbody>{matchesList}</tbody>
            </Table>
        <div style={{textAlign: "center"}}>
        <Button outline color="success">
            <Link
                to={`/matches/create`} className="btn sm"
                style={{ textDecoration: "none" }}>Create Match</Link>
        </Button>
        </div>
        </div>
        </div>
        </div>
        </div>
        );
    }
}