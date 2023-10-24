import React, { useState } from 'react';

function FriendsList() {
  const [friends, setFriends] = useState(['Amigo 1', 'Amigo 2']);
  const [newFriend, setNewFriend] = useState('');
  const [pendingRequests, setPendingRequests] = useState(['Amigo 3']); // Lista de solicitudes pendientes

  const addFriend = () => {
    if (newFriend !== '' && !friends.includes(newFriend)) {
      setFriends([...friends, newFriend]);
      setNewFriend('');
    }
  };

  const sendFriendRequest = (friendName) => {
    // Simulación de enviar una solicitud de amistad
    setPendingRequests([...pendingRequests, friendName]);
  };

  return (
    <div className="friends-list-container">
      <h1>Lista de Amigos</h1>
      <ul className="friends-list">
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Nombre de amigo"
        value={newFriend}
        onChange={(e) => setNewFriend(e.target.value)}
      />
      <button onClick={addFriend}>Agregar Amigo</button>

      <h2>Solicitudes Pendientes</h2>
      <ul>
        {pendingRequests.map((request, index) => (
          <li key={index}>
            {request}
            <button onClick={() => sendFriendRequest(request)}>Aceptar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FriendsList;
