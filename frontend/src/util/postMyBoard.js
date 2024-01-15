import { useEffect, useState } from "react";

export default function postMyBoard(jwt, matchId, username, data) {
    fetch(`/api/v1/matches/${matchId}/${username}/saveBoard`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    //TODO 
    //que lleve a la pantalla de final de partida
    })//.then(window.location.href())
}