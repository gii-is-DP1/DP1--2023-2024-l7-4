import React, { useState, useEffect } from 'react';
import '../App.css';
import { Form, Table, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import tokenService from '../services/token.service';
import useFetchState from "../util/useFetchState";

const jwt = tokenService.getLocalAccessToken();
const user = tokenService.getUser();


export default function MyFriends(){
    const playerId = user.id;
    const username = jwt ? jwtDecode(jwt).sub : "null";

    const [message, setMessage] = useState(null);
    const [visible, setVisible] = useState(false);

    const [friends, setFriends ]= useFetchState(
        [],
        `/api/v1/players/${playerId}/friends`,
        jwt,
        setMessage,
        setVisible
    );

    console.log(friends)

    const [pendingRequests,setPendingRequests] = useFetchState(
        [],
        `/api/v1/requests/${playerId}/received`,
        jwt,
        setMessage,
        setVisible
    );

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Para gestionar el estado de carga

    const [loadingFriends, setLoadingFriends] = useState(true);
    const [loadingRequests, setLoadingRequests] = useState(true);

    const [error, setError] = useState(null);

    console.log(pendingRequests)


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtrar amigos por nombre usando el término de búsqueda
    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className="container">
            
            <div className="friends-list">
                <div className="friends-header">Online Friends</div>
                <ul>
                    {filteredFriends.map((friend, index) => (
                        <li key={index} className={friend}>
                            {friend.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="pending-requests">
                <div className="requests-header">Pending Requests</div>
                <ul>
                    {pendingRequests.map((request, index) => (
                        <li key={index}>
                            {request.playerOne.name} {/* Ajusta esto según el formato de la solicitud */}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="search-friends">
                <div className="search-header">Search friends</div>
                <input
                    type="text"
                    placeholder="Escribe un nombre..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
            </div>

        </div>
    );
}