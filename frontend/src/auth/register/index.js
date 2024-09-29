import "../../static/css/auth/authButton.css";
import "../../static/css/auth/authPage.css";
import tokenService from "../../services/token.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default function Register() {
  const [player, setPlayer] = useState({
    name: "",
    surname: "",
    nickname: "",
    email: "",
    username: "",
    password: "",
    avatar: "",
    biography: "",
    location: "",
    birthdate: "",
    favoriteGenres: "",
    favoritePlatforms: "",
    favoriteSagas: "",
    profileType: "CASUAL",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setPlayer({ ...player, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const request = player;

    fetch("/api/v1/auth/signup", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(request),
    })
      .then(function (response) {
        if (response.status === 200) {
          const loginRequest = {
            username: request.username,
            password: request.password,
          };

          fetch("/api/v1/auth/signin", {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify(loginRequest),
          })
            .then(function (response) {
              if (response.status === 200) {
                return response.json();
              } else {
                return response.json().then((data) => {
                  throw new Error(data.message);
                });
              }
            })
            .then(function (data) {
              tokenService.setUser(data);
              tokenService.updateLocalAccessToken(data.token);
              window.location.href = "/";
            })
            .catch((message) => {
              alert(message);
            });
        }
      })
      .catch((message) => {
        alert(message);
      });
  }

  useEffect(() => {}, []);

  return (
    <div className="auth-page-container5">
      <div className="hero-div">
        <h1 className="text-center">Register</h1>
        <Form onSubmit={handleSubmit} className="western-form-container2">
          <div className="form-container">
            <div className="main-info">
              <h1>Player</h1>
              <FormGroup>
                <Label for="name">
                  Name<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  name="name"
                  id="name"
                  value={player.name}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="surname">
                  Surname<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  name="surname"
                  id="surname"
                  value={player.surname}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="nickname">
                  Nickname<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  name="nickname"
                  id="nickname"
                  value={player.nickname}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="email">
                  Email<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  name="email"
                  id="email"
                  value={player.email}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="username">
                  Username<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  name="username"
                  id="username"
                  value={player.username}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">
                  Password<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="password"
                  required
                  name="password"
                  id="password"
                  value={player.password}
                  onChange={handleChange}
                />
              </FormGroup>
            </div>

            <div className="public-info">
              <h1>Public Profile</h1>
              <FormGroup>
                <Label for="avatar">
                  Avatar<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  name="avatar"
                  id="avatar"
                  value={player.avatar}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="biography">Biography</Label>
                <Input
                  type="textarea"
                  name="biography"
                  id="biography"
                  value={player.biography}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="location">
                  Location<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="text"
                  required
                  name="location"
                  id="location"
                  value={player.location}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="birthdate">Birthdate</Label>
                <Input
                  type="date"
                  name="birthdate"
                  id="birthdate"
                  value={player.birthdate}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="favoriteGenres">Favorite Genres</Label>
                <Input
                  type="text"
                  name="favoriteGenres"
                  id="favoriteGenres"
                  value={player.favoriteGenres}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="favoritePlatforms">Favorite Platforms</Label>
                <Input
                  type="text"
                  name="favoritePlatforms"
                  id="favoritePlatforms"
                  value={player.favoritePlatforms}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="favoriteSagas">Favorite Sagas</Label>
                <Input
                  type="text"
                  name="favoriteSagas"
                  id="favoriteSagas"
                  value={player.favoriteSagas}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="profileType">
                  Profile Type<span className="required-asterisk">*</span>
                </Label>
                <Input
                  type="select"
                  required
                  name="profileType"
                  id="profileType"
                  value={player.profileType}
                  onChange={handleChange}
                >
                  <option value="HARDCORE">HARDCORE</option>
                  <option value="CASUAL">CASUAL</option>
                </Input>
              </FormGroup>
            </div>
          </div>

          <div className="custom-button-row">
            <button type="submit" className="button-container">
              Save
            </button>
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