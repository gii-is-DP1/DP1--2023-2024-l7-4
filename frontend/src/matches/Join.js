import React, { useEffect } from 'react';
import '../App.css';
import '../static/css/home/home.css'; 
import logo from '../static/images/desembarco_del_rey.jpg';
import tokenService from '../services/token.service';
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Table } from "reactstrap";
import useFetchState from "../util/useFetchState";
import getIdFromUrl from "../util/getIdFromUrl";


export default function Join(){
    const id = getIdFromUrl(2);
    const jwt = tokenService.getLocalAccessToken();
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [match, setMatch] = useFetchState(
        [],
        `/api/v1/matches/${id}`,
        jwt,
        setMessage,
        setVisible,
        id 
    );

    const random = [];
    //while(random.length<4){
        //const criterios = ["A1", "A2", "A3", "A4", "A5", "A6","B1", "B2", "B3", "B4", "B5", "B6"];
        //let criterio = criterios[Math.floor(Math.random() * criterios.length)]
        //if ((random.filter(cr => cr.includes("A")).length < 2  && (random.filter(cr => cr.includes("B")).length < 2) && !random.includes(criterio)))
        //    random.push(criterio)
//}
        

    const matchPlayerList =  match.joinedPlayers;

    return (
        <div>
        <div className="admin-page-container">
        <h1 className="text-center"> JOINED PLAYERS</h1>
        <div>
            <Table aria-label="achievements" className="mt-4">
                <thead>
                    <tr>
                        <th className="text-center">PLAYERS</th>
                    </tr>
                </thead>
                <tbody>{matchPlayerList}</tbody>
            </Table>
            <div>
                <h1 className='text-center'>SCORING CRITERIA</h1>
                <th className='text-center'>{random}</th> 
                
            </div>
        </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button outline color="success">
            <Link to={`/`} className="btn sm" style={{ textDecoration: "none" }}>
                Leave Lobby
            </Link>
            </Button>
            </div>
        </div>
      );
}
    
