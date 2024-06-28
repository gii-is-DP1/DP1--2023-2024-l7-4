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
    const [stompClient, setStompClient] = useState(null);
    const [matches, setMatches] = useFetchState(
        [],
        `/api/v1/matches`,
        jwt,
        setMessage,
        setVisible
    );
    const [matchList, setMatchList] = useState([]);



    useEffect(() => {
        if (filterCreated) {
            setMatchList(matches.filter((match) => match.joinedPlayers[0] === username));
        } else {
            setMatchList(matches.filter((match) => match.joinedPlayers.includes(username)));
        }
    }, [filterCreated, matches]);

    const toggleFilterCreated = () => {
        setFilterCreated(!filterCreated);
    };

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
                                    <th className="table-western">WON</th>

                                </tr>
                            </thead>
                            <tbody>{
                                matchList.map((m) => (
                                    <tr key={m.id}>
                                        <td className='table-western'>{m.name}</td>
                                        <td className='table-western'>{m.matchState}</td>
                                        <td className='table-western'>{m.joinedPlayers[0] === username ? 'YES' : 'NO'}</td>
                                        <td className='table-western'>{m.winner === username ? 'YES' : 'NO'}</td>
                                    </tr>
                                ))
                            }</tbody>
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