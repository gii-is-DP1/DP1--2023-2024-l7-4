import React, { useState, useEffect } from 'react';
import '../App.css';
import { Form, Table, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import tokenService from '../services/token.service';


const jwt = tokenService.getLocalAccessToken();
const user = tokenService.getUser();


export default function MyFriends(){
    const playerId = user.id;
    const username = jwt ? jwtDecode(jwt).sub : "null";

    const [friends, setFriends ]= useState([]);

    const [pendingRequests,setPendingRequests] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); // Para gestionar el estado de carga

    const [loadingFriends, setLoadingFriends] = useState(true);
    const [loadingRequests, setLoadingRequests] = useState(true);

    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`/api/players/${playerId}/friends`); // Llamada al backend
                setFriends(response.data); // Guardamos los amigos en el estado
                setLoading(false); // Desactivamos el estado de carga
            } catch (err) {
                setError(err); // Guardamos el error en caso de que haya uno
                setLoading(false); // Desactivamos el estado de carga incluso si hay error
            }
        };

        fetchFriends();
        console.log(friends)
        console.log(pendingRequests)
    }, [playerId]);

    // Usamos useEffect para hacer la solicitud de solicitudes pendientes
    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get(`/api/requests/${playerId}`); // Llamada al backend para obtener solicitudes pendientes
                setPendingRequests(response.data);
                setLoadingRequests(false);
            } catch (err) {
                setError(err);
                setLoadingRequests(false);
            }
        };

        fetchPendingRequests();
    }, [playerId]);


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
                            {request.playerOne} {/* Ajusta esto según el formato de la solicitud */}
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