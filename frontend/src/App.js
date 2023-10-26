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
import OwnerPetList from "./owner/pets/petList";
import PlanList from "./public/plan";
import tokenService from "./services/token.service";
import VetConsultationTickets from "./vet/consultations/tickets/ticketList";
import UserListAdmin from "./admin/users/UserListAdmin";
import UserEditAdmin from "./admin/users/UserEditAdmin";
import OwnerListAdmin from "./admin/owners/OwnerListAdmin";
import OwnerEditAdmin from "./admin/owners/OwnerEditAdmin";
import SwaggerDocs from "./public/swagger";
import ClinicsList from "./clinicOwner/clinicsList"
import EditClinic from "./clinicOwner/clinicEdit"
import OwnerListClinicOwner from "./clinicOwner/ownersList"
import ConsultationListClinicOwner from "./clinicOwner/consultations/ConsultationListClinicOwner";
import ConsultationEditClinicOwner from "./clinicOwner/consultations/ConsultationEditClinicOwner";
import VetListClinicOwner from "./clinicOwner/vets/VetListClinicOwner";
import VetEditClinicOwner from "./clinicOwner/vets/VetEditClinicOwner";
import AchievementList from "./achievements/achievementList";
import AchievementEdit from "./achievements/achievementEdit";
import AchievementListPlayer from "./achievements/achievementListPlayer";
import RankingPlayers from "./players/Ranking";
import PlayerListAdmin from "./admin/players/PlayerListAdmin";
import PlayerEditAdmin from "./admin/players/PlayerEditAdmin";
import MyGamesF from "./myGames/myGamesF";
import Chat from "./Chat";
import FriendsList from "./FiendsList";
import PlayerEdit from "./players/playerEdit"
import SelectionParty from "./play/selectionParty"
import CreationMatch from "./play/creationMatch"
import CreationForm from "./play/creationForm"

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
          <Route path="/mygames" exact={true} element={<PrivateRoute><MyGamesF/></PrivateRoute>} />
          <Route path="/play" exact={true} element={<PrivateRoute><SelectionParty/></PrivateRoute>} />
          <Route path="/play/create" exact={true} element={<PrivateRoute><CreationMatch/></PrivateRoute>} />
          <Route path="/play/matches" exact={true} element={<PrivateRoute><CreationForm/></PrivateRoute>} />

        </>)
    }
    if (role === "VET") {
      vetRoutes = (
        <>
          {/* <Route path="/dashboard" element={<PrivateRoute><OwnerDashboard /></PrivateRoute>} /> */}
          <Route path="/myPets" exact={true} element={<PrivateRoute><OwnerPetList /></PrivateRoute>} />
          <Route path="/consultations/:consultationId/tickets" exact={true} element={<PrivateRoute><VetConsultationTickets /></PrivateRoute>} />
        </>)
    }
    if (role === "CLINIC_OWNER") {
      vetRoutes = (
        <>
          <Route path="/owners" exact={true} element={<PrivateRoute><OwnerListClinicOwner /></PrivateRoute>} />
          <Route path="/clinics" exact={true} element={<PrivateRoute><ClinicsList /></PrivateRoute>} />
          <Route path="/clinics/:id" exact={true} element={<PrivateRoute><EditClinic /></PrivateRoute>} />
          <Route path="/consultations" exact={true} element={<PrivateRoute><ConsultationListClinicOwner /></PrivateRoute>} />
          <Route path="/consultations/:id" exact={true} element={<PrivateRoute><ConsultationEditClinicOwner /></PrivateRoute>} />
          <Route path="/consultations/:id/tickets" exact={true} element={<PrivateRoute><VetConsultationTickets /></PrivateRoute>} />
          <Route path="/vets" exact={true} element={<PrivateRoute><VetListClinicOwner /></PrivateRoute>} />
          <Route path="/vets/:id" exact={true} element={<PrivateRoute><VetEditClinicOwner /></PrivateRoute>} />
          <Route path="/players" exact={true} element={<PrivateRoute><PlayerEdit/></PrivateRoute>} />
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
        <Chat />
        <FriendsList />
      </ErrorBoundary>
    </div>
  );
}

export default App;
