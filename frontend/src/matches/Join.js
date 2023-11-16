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
    let intentos = 0;
    while (random.length < 4 && intentos < 1000000) {
        
        const criteriosA = ["A1", "A2", "A3", "A4", "A5", "A6"];
        const criteriosB = ["B1", "B2", "B3", "B4", "B5", "B6"];
        let criteriosAIndex = Math.floor(Math.random() * criteriosA.length);
        let criteriosBIndex = Math.floor(Math.random() * criteriosB.length);
        let criterioA = criteriosA[criteriosAIndex]
        let criterioB = criteriosB[criteriosBIndex]
        if (
        random.filter(cr => cr.includes("A")).length < 2 &&
        random.filter(cr => cr.includes("B")).length < 2 &&
        !random.includes(criterioA) && !random.includes(criterioB)

    ) {
        random.push(criterioA)
        random.push(criterioB)
    }

    intentos++;
}

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
        </div>
      );
}
    
