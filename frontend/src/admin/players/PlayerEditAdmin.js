import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Label, FormGroup } from "reactstrap";
import tokenService from "../../services/token.service";
import '../../static/css/westernTheme.css';
import '../../static/css/public.css'
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
    profileType: "CASUAL",  
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
    <div className="auth-page-container5">
      <div className="hero-div">
        {<h1>{player.id ? "Edit" : "New"}</h1>}
        {modal}
        <Form onSubmit={handleSubmit} className='western-form-container2'>
          <div className="form-container">
            <div className="main-info">
              <h1>Player</h1>
              <FormGroup>
                <Label for="name">Name<span className="required-asterisk">*</span></Label>
                <Input type="text" required name="name" id="name" value={player.name || ""}
                  onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="surname">Surname<span className="required-asterisk">*</span></Label>
                <Input type="text" required name="surname" id="surname" value={player.surname || ""}
                  onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="nickname">Nickname<span className="required-asterisk">*</span></Label>
                <Input type="text" required name="nickname" id="nickname" value={player.nickname || ""}
                  onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email<span className="required-asterisk">*</span></Label>
                <Input type="text" required name="email" id="email" value={player.email || ""}
                  onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="username">Username<span className="required-asterisk">*</span></Label>
                <Input type="text" required name="username" id="username" value={player.username || ""}
                  onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password<span className="required-asterisk">*</span></Label>
                <Input type="password" required name="password" id="password" value={player.password || ""}
                  onChange={handleChange} />
              </FormGroup>
            </div>
  
            <div className="public-info">
              <h1>Public Profile</h1>
              <FormGroup>
                <Label for="avatar">Avatar<span className="required-asterisk">*</span></Label>
                <Input type="text" required name="avatar" id="avatar" value={player.avatar || ""}
                  onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="biography">Biography</Label>
                <Input type="textarea" name="biography" id="biography" value={player.biography || ""}
                  onChange={handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="location">Location<span className="required-asterisk">*</span></Label>
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
              <FormGroup>
                <Label for="profileType">Profile Type<span className="required-asterisk">*</span></Label>
                <Input type="select" required name="profileType" id="profileType" value={player.profileType || "CASUAL"} onChange={handleChange}>
                  <option value="HARDCORE">HARDCORE</option>
                  <option value="CASUAL">CASUAL</option>
                </Input>
              </FormGroup>
            </div>
          </div>
          
          <div className="custom-button-row">
            <button className="button-container">Save</button>
            <Link
              to={`/players`}
              className="button-container-bad"
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
