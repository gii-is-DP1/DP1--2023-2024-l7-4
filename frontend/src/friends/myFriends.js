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


    const [pendingRequests,setPendingRequests] = useFetchState(
        [],
        `/api/v1/requests/${playerId}/received`,
        jwt,
        setMessage,
        setVisible
    );

    const [players,setPlayers] = useFetchState(
        [],
        `/api/v1/players`,
        jwt,
        setMessage,
        setVisible
    );


    const [searchTerm, setSearchTerm] = useState('');

    const [loading, setLoading] = useState(true); // Para gestionar el estado de carga

    const [loadingFriends, setLoadingFriends] = useState(true);
    const [loadingRequests, setLoadingRequests] = useState(true);

    const [error, setError] = useState(null);

    


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filtrar amigos por nombre usando el término de búsqueda
    //const filteredFriends = friends.filter(friend =>
     //   friend.name.toLowerCase().includes(searchTerm.toLowerCase())
    //);

    const handleAcceptRequest = async (requestId) => {
        try {
            
            const updatedRequest = {
                status: 'ACCEPTED',
            };

            const response = await axios.put(`/api/v1/requests/${requestId}`, updatedRequest, {
                headers: {
                    Authorization: `Bearer ${jwt}`, 
                    'Content-Type': 'application/json'
                }

            });

            if(response.status === 200) {
                setPendingRequests(prevRequest => prevRequest.filter(request => request.id!== requestId));
            } else {
                throw new Error('Hubo un error al actualizar la solicitud.');
            }
            
        } catch (error) {
            console.error(error);
            setError('Hubo un error al aceptar la solicitud.');
            
        }
    
    
    }

    const handleDeclineRequest = async (requestId) => {
        try {
            const response = await axios.delete(`/api/v1/requests/${requestId}`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            })
            if(response.status === 204) {
                setPendingRequests(prevRequests => 
                    prevRequests.filter(request => request.id !== requestId)
                );
            } else {    
                throw new Error('Hubo un error al eliminar la solicitud.');
            }
        } catch {
            console.error(error);
            setError('Hubo un error al rechazar la solicitud.');
        }
    }

    const handleSendRequest = async (username) => {
        try{
            
            const player2 = players.find(player => player.nickname === username);

            if (!player2) {
                setError(`Jugador con nombre ${username} no encontrado.`);
            }
            if (!user.username || !player2.username) {
                setError('Nombre de usuario del jugador no puede ser nulo.');
                return;
            }
            console.log('Enviando solicitud con los siguientes datos:', {
                playerOne: user.username,
                playerTwo: player2.username,
                status: 'PENDING'
            });
    
            const requestData = {
                playerOne: user.username,
                playerTwo: player2.username,
                status: 'PENDING'
            };
    
    
            const response = await axios.post(`/api/v1/requests`, requestData, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                }
            });

        console.log('Respuesta de la API:', response);

            
            if(response.status === 201) {
                setVisible(true);
                setMessage('Solicitud enviada correctamente.');
            }
        }catch(error){
            console.error(error);
            setError('Hubo un error al enviar la solicitud.');
    
    }
}




    return (
        <div className="container">
            
            <div className="friends-list">
                <div className="friends-header">Online Friends</div>
                <ul>
                    {friends.map((friend, index) => (
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
                            
                            {request.playerOne.name} 
                            <div>
                                <Button  
                                    onClick={() => handleAcceptRequest(request.id)}
                                    color="success">
                                    Accept
                                </Button>
                                <Button
                                    onClick={() => handleDeclineRequest(request.id)}
                                    color='danger'> 
                                    Decline
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="search-friends">
                <li>
                <div className="search-header">Search new friends </div>
                <input
                    type="text"
                    placeholder="Write an username..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <Button color="primary"
                onClick={( ) => handleSendRequest(searchTerm)}>
                    Send Request
                    </Button>
                </li>
            </div>

        </div>
    );
}