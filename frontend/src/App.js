import React from "react";
import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ErrorBoundary } from "react-error-boundary";
import AppNavbar from "./AppNavbar";
import Home from "./home";
import PrivateRoute from "./privateRoute";
import Register from "./auth/register";
import Login from "./auth/login";
import Logout from "./auth/logout";
import PlanList from "./public/plan";
import tokenService from "./services/token.service";
import MyProfile from "./player/myProfile";
import UserListAdmin from "./admin/users/UserListAdmin";
import UserEditAdmin from "./admin/users/UserEditAdmin";
import SwaggerDocs from "./public/swagger";
import PlayerEdit from "./player";
import WaitingRoom from "./matches/WaitingRoom";
import CreateMatch from "./matches/CreateMatch";
import Game from "./game/Game";
import MyMatches from "./matches/myMatches";
import "./static/css/westernTheme.css";
import MyMatchesAdmin from "./matches/myMatchesAdmin";
import Stadistics from "./player/stadistics/Stadistics";

import Logros from "./player/stadistics/Logros";

import PlayerListAdmin from "./admin/players/PlayerListAdmin";
import PlayerEditAdmin from "./admin/players/PlayerEditAdmin";
import Personal from "./player/stadistics/Personal";
import MyFriends from "./friends/myFriends";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const jwt = tokenService.getLocalAccessToken();
  let roles = [];
  if (jwt) {
    roles = getRolesFromJWT(jwt);
  }

  function getRolesFromJWT(jwt) {
    return jwt_decode(jwt).authorities;
  }

  let adminRoutes = <></>;
  let ownerRoutes = <></>;
  let userRoutes = <></>;
  let vetRoutes = <></>;
  let publicRoutes = <></>;

  roles.forEach((role) => {
    if (role === "ADMIN") {
      adminRoutes = (
        <>
          <Route
            path="/users"
            exact={true}
            element={
              <PrivateRoute>
                <UserListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:username"
            exact={true}
            element={
              <PrivateRoute>
                <UserEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/allMatches"
            exact={true}
            element={
              <PrivateRoute>
                <MyMatchesAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/players"
            exact={true}
            element={
              <PrivateRoute>
                <PlayerListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/players/:playerId"
            exact={true}
            element={
              <PrivateRoute>
                <PlayerEditAdmin />
              </PrivateRoute>
            }
          />
        </>
      );
    }
    if (role === "PLAYER") {
      ownerRoutes = (
        <>
          {/* aqui se meten todas las rutas que voy a usar */}
          <Route
            path="/statistics"
            exact={true}
            element={
              <PrivateRoute>
                <Stadistics />
              </PrivateRoute>
            }
          />
          <Route
            path="/myProfile/:username"
            element={
              <PrivateRoute>
                <MyProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/statistics/personal"
            exact={true}
            element={
              <PrivateRoute>
                <Personal />
              </PrivateRoute>
            }
          />
          <Route
            path="/statistics/achievements"
            exact={true}
            element={
              <PrivateRoute>
                <Logros />
              </PrivateRoute>
            }
          />
          <Route
            path="/players/edit/:username"
            element={
              <PrivateRoute>
                <PlayerEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/game"
            element={
              <PrivateRoute>
                <Game />
              </PrivateRoute>
            }
          />
          <Route
            path="/match/:id/waitingRoom"
            element={
              <PrivateRoute>
                <WaitingRoom />
              </PrivateRoute>
            }
          />
          <Route
            path="/match/create"
            exact={true}
            element={
              <PrivateRoute>
                <CreateMatch />
              </PrivateRoute>
            }
          />
          <Route
            path="/game/:matchId"
            exact={true}
            element={
              <PrivateRoute>
                <Game />
              </PrivateRoute>
            }
          />
          <Route
            path="/myMatches"
            exact={true}
            element={
              <PrivateRoute>
                <MyMatches />
              </PrivateRoute>
            }
          />
          <Route
            path="/myFriends"
            exact={true}
            element={
              <PrivateRoute>
                <MyFriends />
              </PrivateRoute>
            }
          />
          <Route
            path="/myGameRequests"
            exact={true}
            element={
              <PrivateRoute>
                <MyFriends />
              </PrivateRoute>
            }
          />
        </>
      );
    }
  });
  if (!jwt) {
    publicRoutes = (
      <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </>
    );
  } else {
    userRoutes = (
      <>
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
      </>
    );
  }

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppNavbar />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/plans" element={<PlanList />} />
          <Route path="/docs" element={<SwaggerDocs />} />
          {publicRoutes}
          {userRoutes}
          {adminRoutes}
          {ownerRoutes}
          {vetRoutes}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
