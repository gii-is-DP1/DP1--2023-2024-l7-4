import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Table } from "reactstrap";
import tokenService from "../../services/token.service";
import '../../static/css/westernTheme.css';
import '../../App.css';
import deleteFromList from "../../util/deleteFromList";
import getErrorModal from "../../util/getErrorModal";
import useFetchState from "../../util/useFetchState";

const jwt = tokenService.getLocalAccessToken();

export default function PlayerEditAdmin() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [players, setPlayers] = useFetchState(
    [],
    `/api/v1/players`,
    jwt,
    setMessage,
    setVisible
  );
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 3;

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const playerList = currentPlayers.map((player) => {
    return (
      <tr key={player.id}>
        <td className='table-western'>{player.nickname}</td>
        <td className='table-western'>{player.username}</td>
        <td className='table-western'>{player.authority.authority}</td>
        <td className='table-western'>
          <ButtonGroup>
            <Button
              className="button-container-secondary"
              size="sm"
              color="secondary"
              aria-label={"edit-" + player.id}
              tag={Link}
              to={"/players/" + player.id}
            >
              Edit
            </Button>
            <Button
              className="button-container-bad"
              size="sm"
              color="danger"
              aria-label={"delete-" + player.id}
              onClick={() =>
                deleteFromList(
                  `/api/v1/players/${player.username}`,
                  player.id,
                  [players, setPlayers],
                  [alerts, setAlerts],
                  setMessage,
                  setVisible
                )
              }
            >
              Delete
            </Button>
          </ButtonGroup>
        </td>
      </tr>
    );
  });

  const modal = getErrorModal(setVisible, visible, message);

  const totalPages = Math.ceil(players.length / playersPerPage);

  return (
    <div className="admin-page-container">
      <div className="hero-div">
        <h1 className="text-center">PLAYERS</h1>
        {alerts.map((a) => a.alert)}
        {modal}
        <Link className="auth-button" tag={Link} to="/players/new">
          ADD PLAYER
        </Link>
        <div>
          <Table aria-label="players" className="table-western">
            <thead>
              <tr>
                <th className="table-western">NICKNAME</th>
                <th className="table-western">USERNAME</th>
                <th className="table-western">AUTHORITY</th>
                <th className="table-western">ACTIONS</th>
              </tr>
            </thead>
            <tbody>{playerList}</tbody>
          </Table>
          <div className="pagination">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </Button>
            <span>Page {currentPage} of {totalPages}</span>
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

