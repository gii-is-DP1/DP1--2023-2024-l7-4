import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Table } from "reactstrap";
import tokenService from "../services/token.service";
import "../static/css/admin/adminPage.css";
import getErrorModal from "../util/getErrorModal";
import useFetchState from "../util/useFetchState";

const jwt = tokenService.getLocalAccessToken();
const imgnotfound = "https://cdn-icons-png.flaticon.com/512/5778/5778223.png";


export default function PlayerListAdmin() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [players, setPlayers] = useFetchState(
    [],
    `/api/v1/players?sorted=true`,
    jwt,
    setMessage,
    setVisible
  );

  const playerlist = players.map((player) => {
    return (
      <tr key={player.id}>
        <td className="text-center">
        <img src={player.avatar ? player.avatar : imgnotfound } alt={player.name} width="50px"/>
        </td>
        <td>{player.nickname}</td>
        <td>{player.total_score}</td>
      </tr>
    );
  });

  const modal = getErrorModal(setVisible, visible, message);

  return (
    <div>
      <div className="admin-page-container">
        <h1 className="text-center">RANKING</h1>
        {modal}
        <div>
          <Table aria-label="players" className="mt-4">
            <thead>
              <tr>
                <th width="10%">Avatar</th>
                <th width="10%">Nickname</th>
                <th width="10%">Total Score</th>
              </tr>
            </thead>
            <tbody>{playerlist}</tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
