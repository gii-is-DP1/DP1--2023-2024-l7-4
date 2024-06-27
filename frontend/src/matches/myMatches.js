import React, { useEffect, useState } from 'react';
import '../App.css';
import '../static/css/westernTheme.css';
import tokenService from '../services/token.service';
import { Link } from "react-router-dom";
import useFetchState from "../util/useFetchState";
import jwtDecode from 'jwt-decode';
import { Form, Table, FormGroup, Label, Input, Button } from 'reactstrap';



const jwt = tokenService.getLocalAccessToken();

export default function MyMatches() {
    const username = jwt ? jwtDecode(jwt).sub : "null";
    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);
    const [filterCreated, setFilterCreated] = useState(false);
    const [matches, setMatches] = useFetchState(
        [],
        `/api/v1/matches/player/${username}`,
        jwt,
        setMessage,
        setVisible
    );


    const toggleFilterCreated = () => {
        setFilterCreated(!filterCreated);
    };

    const matchesList = matches.map((m) => {
        return (
            <tr key={m.id}>
                <td className='table-western'>{m.name}</td>
                <td className='table-western'>{m.matchState}</td>
                <td className='table-western'>{m.joinedPlayers[0] === username ? 'CREATOR' : 'NOT CREATOR'}</td>
            </tr>
        );
    });

    return (
        <div>
            <div className="admin-page-container">
                <div className="hero-div">
                    <h1 className="text-center"> MY GAMES</h1>
                    <div>
                        <Table aria-label="onlineGames" className="table-western">
                            <thead>
                                <tr>
                                    <th className="table-western">NAME</th>
                                    <th className="table-western">STATE</th>
                                    <th className="table-western">CREATOR</th>
                                </tr>
                            </thead>
                            <tbody>{filterCreated ? matchesList.filter((match) => match.matchState === 'CREATED') : matchesList}</tbody>
                        </Table>
                        <div style={{ textAlign: 'center' }}>
                            <Button onClick={toggleFilterCreated}>
                                {filterCreated ? 'Show all matches' : 'Show created matches'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}