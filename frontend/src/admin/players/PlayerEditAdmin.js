import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Label, FormGroup } from "reactstrap";
import tokenService from "../../services/token.service";
import '../../static/css/westernTheme.css';
import '../../App.css'
import getErrorModal from "../../util/getErrorModal";
import getIdFromUrl from "../../util/getIdFromUrl";
import useFetchState from "../../util/useFetchState";

const jwt = tokenService.getLocalAccessToken();

export default function PlayerEditAdmin() {
  const emptyItem = {
    id: null,
    nickname: "",
    username: "",
    password: "",
    authority: "PLAYER",
  };
  const id = getIdFromUrl(2);
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [player, setPlayer] = useFetchState(
    emptyItem,
    `/api/v1/players/${id}`,
    jwt,
    setMessage,
    setVisible,
    id
  );



  useEffect(() => {
    if (!visible && isSuccessful) {
      window.location.href = "/players";
    }
  }, [visible, isSuccessful]);


  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    setPlayer({ ...player, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch(player.id ? "/api/v1/players/" + player.id : "/api/v1/auth/signup", {
      method: player.id ? "PUT" : "POST",
      headers: player.id ? {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      } : { "Content-Type": "application/json" }
      ,
      body: JSON.stringify(player),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message) {
          setMessage(json.message);
          setVisible(true);
          setIsSuccessful(true);
        } else {
          window.location.href = "/players";
        }
      })
      .catch((message) => alert(message));
  }

  const modal = getErrorModal(setVisible, visible, message);

  return (
    <div className="auth-page-container2">
      <div className="hero-div">
        {<h2>{player.id ? "Edit Player" : "Add Player"}</h2>}
        {modal}
        <Form onSubmit={handleSubmit} className='auth-form-container2'>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input type="text" required name="name" id="name" value={player.name || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="surname">Surname</Label>
            <Input type="text" required name="surname" id="surname" value={player.surname || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="avatar">Avatar</Label>
            <Input type="text" required name="avatar" id="avatar" value={player.avatar || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="nickname">Nickname</Label>
            <Input type="text" required name="nickname" id="nickname" value={player.nickname || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="text" required name="email" id="email" value={player.email || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="text" required name="username" id="username" value={player.username || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" required name="password" id="password" value={player.password || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="biography">Biography</Label>
            <Input type="textarea" name="biography" id="biography" value={player.biography || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="location">Location</Label>
            <Input type="text" required name="location" id="location" value={player.location || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="birthdate">Birthdate</Label>
            <Input type="date" name="birthdate" id="birthdate" value={player.birthdate || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="favoriteGenres">Favorite Genres</Label>
            <Input type="text" name="favoriteGenres" id="favoriteGenres" value={player.favoriteGenres || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="favoritePlatforms">Favorite Platforms</Label>
            <Input type="text" name="favoritePlatforms" id="favoritePlatforms" value={player.favoritePlatforms || ""}
              onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="favoriteSagas">Favorite Sagas</Label>
            <Input type="text" name="favoriteSagas" id="favoriteSagas" value={player.favoriteSagas || ""}
              onChange={handleChange} />
          </FormGroup>
          <div className="custom-button-row">
            <button className="auth-button">Save</button>
            <Link
              to={`/players`}
              className="auth-button"
              style={{ textDecoration: "none" }}
            >
              Cancel
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
