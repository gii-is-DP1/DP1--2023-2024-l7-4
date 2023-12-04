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
import UserListAdmin from "./admin/users/UserListAdmin";
import UserEditAdmin from "./admin/users/UserEditAdmin";
import OwnerListAdmin from "./admin/owners/OwnerListAdmin";
import OwnerEditAdmin from "./admin/owners/OwnerEditAdmin";
import SwaggerDocs from "./public/swagger";
import AchievementList from "./achievements/achievementList";
import AchievementEdit from "./achievements/achievementEdit";
import AchievementListPlayer from "./achievements/achievementListPlayer";
import RankingPlayers from "./players/Ranking";
import PlayerListAdmin from "./admin/players/PlayerListAdmin";
import PlayerEditAdmin from "./admin/players/PlayerEditAdmin";
import PlayerEdit from "./players";
import MyMatches from "./matches/MyMatches";
import CreationForm from "./play/CreationForm";
import Join from "./matches/Join";
import Tablero from "./board/Tablero";
import MyProfile from "./players/myProfile";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

function App() {
  const jwt = tokenService.getLocalAccessToken();
  let roles = []
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
          <Route path="/users" exact={true} element={<PrivateRoute><UserListAdmin /></PrivateRoute>} />
          <Route path="/users/:username" exact={true} element={<PrivateRoute><UserEditAdmin /></PrivateRoute>} />
          <Route path="/owners" exact={true} element={<PrivateRoute><OwnerListAdmin /></PrivateRoute>} />
          <Route path="/owners/:id" exact={true} element={<PrivateRoute><OwnerEditAdmin /></PrivateRoute>} />
          <Route path="/achievements/" exact={true} element={<PrivateRoute><AchievementList /></PrivateRoute>} />
          <Route path="/achievements/:achievementId" exact={true} element={<PrivateRoute><AchievementEdit/></PrivateRoute>} />
          <Route path="/ranking" exact={true} element={<PrivateRoute><RankingPlayers/></PrivateRoute>} />
          <Route path="/players" exact={true} element={<PrivateRoute><PlayerListAdmin/></PrivateRoute>} />
          <Route path="/players/:playerId" exact={true} element={<PrivateRoute><PlayerEditAdmin/></PrivateRoute>} />
          <Route path="/players/edit/:username" exact={true} element={<PrivateRoute><PlayerEdit/></PrivateRoute>} />
        
        </>)
    }
    if (role === "PLAYER") {
      ownerRoutes = (
        <>
          <Route path="/achievements/" exact={true} element={<PrivateRoute><AchievementListPlayer /></PrivateRoute>} />
          <Route path="/ranking" exact={true} element={<PrivateRoute><RankingPlayers/></PrivateRoute>} />
          <Route path="/players/edit/:username" exact={true} element={<PrivateRoute><PlayerEdit/></PrivateRoute>} />
          <Route path="/players/:username/myMatches" exact={true} element={<PrivateRoute><MyMatches/></PrivateRoute>} />
          <Route path="/matches/create" exact={true} element={<PrivateRoute><CreationForm/></PrivateRoute>} />
          <Route path="/mymatches/:id/join" exact={true} element={<PrivateRoute><Join/></PrivateRoute>} />
          <Route path="/board" exact={true} element={<PrivateRoute><Tablero/></PrivateRoute>} />
          <Route path="/myProfile/:username" exact={true} element={<PrivateRoute><MyProfile/></PrivateRoute>} />


        </>)
    }
  })
  if (!jwt) {
    publicRoutes = (
      <>        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ranking" exact={true} element={<PrivateRoute><RankingPlayers/></PrivateRoute>} />
      </>
    )
  } else {
    userRoutes = (
      <>
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}        
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
      </>
    )
  }

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback} >
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
