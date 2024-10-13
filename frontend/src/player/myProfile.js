import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import tokenService from "../services/token.service";
import getErrorModal from "../util/getErrorModal";
import useFetchState from "../util/useFetchState";
import getIdFromUrl from "../util/getIdFromUrl";
import '../static/css/westernTheme.css';
import '../App.css';
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

const jwt = tokenService.getLocalAccessToken();
const imgnotfound = "https://cdn-icons-png.flaticon.com/512/5778/5778223.png";

export default function MyProfile() {
  const username = getIdFromUrl(2);
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);

  const emptyPlayer = {
    id: "",
    name: "",
    surname: "",
    avatar: "",
    nickname: "",
    email: "",
    biography: '',
    location: '',
    birthdate: '',
    favoriteGenres: '',
    favoritePlatforms: '',
    favoriteSagas: '',
  };

  const [player, setPlayer] = useFetchState(
    emptyPlayer,
    `/api/v1/players/username/${username}`,
    jwt,
    setMessage,
    setVisible,
    username
  );

  useEffect(() => {
    setPlayer(emptyPlayer);
  }, [username]);

  const modal = getErrorModal(setVisible, visible, message);

  return (
    <div>
      <div className="admin-page-container">
        <div className="hero-div">
          <h1 className="text-center">PROFILE</h1>
          {modal}
          <div>
            <Table aria-label="players" className="table-western">
              <tbody>
                <tr>
                  <th width="10%" className="table-western">Avatar</th>
                  <td className="table-western">
                    <img src={player.avatar ? player.avatar : imgnotfound} alt={player.name} width="50px" />
                  </td>
                </tr>
                <tr>
                  <th width="10%" className="table-western">Nickname</th>
                  <td className="table-western">{player.nickname}</td>
                </tr>
              </tbody>
            </Table>
            <Link to={`/players/edit/${username}`}>
              <button className="button-container">Edit Player</button>
            </Link>
            <Link to={`/players/edit2/${username}`}>
              <button className="button-container">Edit Public Profile</button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}