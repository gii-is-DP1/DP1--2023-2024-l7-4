import React from "react";
import { Link } from "react-router-dom";
import "../../static/css/auth/authButton.css";
import "../../static/css/auth/authPage.css";
import tokenService from "../../services/token.service";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Logout = () => {
  function sendLogoutRequest() {
    const jwt = window.localStorage.getItem("jwt");
    if (jwt || typeof jwt === "undefined") {
      const username = jwt ? jwtDecode(jwt).sub : "null";
      if (username !== "admin1"){
        sendOnlineFalse(username, jwt);
      }
      tokenService.removeUser();
      window.location.href = "/";
    } else {
      alert("There is no user logged in");
    }
  }

  const sendOnlineFalse = async (username, jwt) => {
    const response = await axios.patch(`api/v1/auth/signout`, username, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log("User signed out");
    } else {
      console.log("Error signing out user");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-form-container">
        <h2 className="text-center text-md">
          Are you sure you want to log out?
        </h2>
        <div className="options-row">
          <Link
            className="auth-button"
            to="/"
            style={{ textDecoration: "none" }}
          >
            No
          </Link>
          <button className="auth-button" onClick={() => sendLogoutRequest()}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
