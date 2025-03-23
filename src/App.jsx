import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import UserForm from "./pages/User/UserForm";
import ChatInterface from "./pages/User/ChatInterface";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminUsersList from "./pages/Admin/AdminUsersList";
import IndividualUserData from "./pages/Admin/IndividualUserData";
import { ROUTERS } from "./helpers/routes";

const App = () => {
  return (
    <Routes>
      <Route path={ROUTERS.LANDING_PAGE} element={<LandingPage />} />

      {/* User */}
      <Route path={ROUTERS.USER.FORM} element={<UserForm />} />
      <Route path={ROUTERS.USER.CHAT} element={<ChatInterface />} />

      {/* Admin */}
      <Route path={ROUTERS.ADMIN.DASHBOARD} element={<AdminDashboard />} />
      <Route path={ROUTERS.ADMIN.USERS} element={<AdminUsersList />} />
      <Route
        path={`${ROUTERS.ADMIN.INDIVIDUAL_USERDATA}/:id`}
        element={<IndividualUserData />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
