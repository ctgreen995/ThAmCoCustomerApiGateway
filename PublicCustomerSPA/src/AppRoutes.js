import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreenContainer from "./Components/HomeScreen/HomeScreenContainer";
import UserDashboardContainer from "./Components/UserDashboard/UserDashboardContainer";
import ClientSection from "./Components/ClientSection/ClientSection";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomeScreenContainer />} />
      <Route path="/userDashboard" element={<UserDashboardContainer />} />
      <Route path="/client/*" element={<ClientSection />} />
    </Routes>
  );
};

export default AppRoutes;
