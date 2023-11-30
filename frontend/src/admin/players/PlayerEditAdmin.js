import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Input, Label } from "reactstrap";
import tokenService from "../../services/token.service";
import "../../static/css/admin/adminPage.css";
import getErrorModal from "../../util/getErrorModal";
import getIdFromUrl from "../../util/getIdFromUrl";
import useFetchData from "../../util/useFetchData";
import useFetchState from "../../util/useFetchState";

const jwt = tokenService.getLocalAccessToken();

export default function PlayerEditAdmin() {
  const emptyItem = {
    id: null,
    nickname:"",
    username: "",
    password: "",
    authority: null,
  };
  const id = getIdFromUrl(2);
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [player, setPlayer] = useFetchState(
    emptyItem,
    `/api/v1/players/${id}`,
    jwt,
    setMessage,
    setVisible,
    id
  );
  const auths = useFetchData(`/api/v1/users/authorities`, jwt);

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if (name === "authority") {
      const auth = auths.find((a) => a.id === Number(value));
      setPlayer({ ...player, authority: auth });
    } else setPlayer({ ...player, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    fetch("/api/v1/players" + (player.id ? "/" + player.id : ""), {
      method: player.id ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message) {
          setMessage(json.message);
          setVisible(true);
        } else window.location.href = "/players";
      })
      .catch((message) => alert(message));
  }

  const modal = getErrorModal(setVisible, visible, message);
  const authOptions = auths.map((auth) => (
    <option key={auth.id} value={auth.id}>
      {auth.authority}
    </option>
  ));

  return (
    <div className="auth-page-container">
      {<h2>{player.id ? "Edit Player" : "Add Player"}</h2>}
      {modal}
      <div className="auth-form-container">
        <Form onSubmit={handleSubmit}>
        <div className="custom-form-input">
            <Label for="name" className="custom-form-input-label">
              Name
            </Label>
            <Input
              type="text"
              required
              name="name"
              id="name"
              value={player.name || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </div><div className="custom-form-input">
            <Label for="surname" className="custom-form-input-label">
              Surname
            </Label>
            <Input
              type="text"
              required
              name="surname"
              id="surname"
              value={player.surname || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </div>
          <div className="custom-form-input">
            <Label for="avatar" className="custom-form-input-label">
              Avatar
            </Label>
            <Input
              type="text"
              required
              name="avatar"
              id="avatar"
              value={player.avatar || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </div>
          <div className="custom-form-input">
            <Label for="email" className="custom-form-input-label">
              Email
            </Label>
            <Input
              type="text"
              required
              name="email"
              id="email"
              value={player.email || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </div>
          <div className="custom-form-input">
            <Label for="nickname" className="custom-form-input-label">
              Nickname
            </Label>
            <Input
              type="text"
              required
              name="nickname"
              id="nickname"
              value={player.nickname || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </div>
          <div className="custom-form-input">
            <Label for="username" className="custom-form-input-label">
              Username
            </Label>
            <Input
              type="text"
              required
              name="username"
              id="username"
              value={player.username || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </div>
          <div className="custom-form-input">
            <Label for="lastName" className="custom-form-input-label">
              Password
            </Label>
            <Input
              type="password"
              required
              name="password"
              id="password"
              value={player.password || ""}
              onChange={handleChange}
              className="custom-input"
            />
          </div>
          <Label for="authority" className="custom-form-input-label">
            Authority
          </Label>
          <div className="custom-form-input">
            {player.id ? (
              <Input
                type="select"
                disabled
                name="authority"
                id="authority"
                value={player.authority?.id || ""}
                onChange={handleChange}
                className="custom-input"
              >
                <option value="">None</option>
                {authOptions}
              </Input>
            ) : (
              <Input
                type="select"
                required
                name="authority"
                id="authority"
                value={player.authority?.id || ""}
                onChange={handleChange}
                className="custom-input"
              >
                <option value="">None</option>
                {authOptions}
              </Input>
            )}
          </div>
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
