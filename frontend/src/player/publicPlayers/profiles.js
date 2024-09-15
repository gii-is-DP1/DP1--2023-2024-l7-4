import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Table } from "reactstrap";
import tokenService from "../../services/token.service";
import '../../static/css/westernTheme.css';
import '../../App.css';
import '../../static/css/public.css'
import getErrorModal from "../../util/getErrorModal";
import useFetchState from "../../util/useFetchState";
import getIdFromUrl from "../../util/getIdFromUrl";

const jwt = tokenService.getLocalAccessToken();

export default function PlayerList() {
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [players, setPlayers] = useFetchState(
    [],
    `/api/v1/players/list`, 
    jwt,
    setMessage,
    setVisible
  );
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 2; 

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const playerList = currentPlayers.map((player) => {
    return (
      <div className="player-card" key={player.id}>
        <img
          src={player.avatar}
          alt={`${player.nickname}'s avatar`}
          className="player-avatar"
        />
        <h3>{player.nickname}</h3>
        <Button
          size="sm"
          color="primary"
          aria-label={"view-" + player.username}
          tag={Link}
          to={`/players/${player.username}`} 
        >
          View Profile
        </Button>
      </div>
    );
  });

  const modal = getErrorModal(setVisible, visible, message);

  const totalPages = Math.ceil(players.length / playersPerPage);

  return (
    <div className="auth-page-container">
      <div className="hero-div">
        <h1 className="text-center">Players</h1>
        {modal}
        <div className="player-grid">{playerList}</div>
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
  );
}
