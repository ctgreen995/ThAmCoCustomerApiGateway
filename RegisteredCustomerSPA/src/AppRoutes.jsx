import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreenContainer from "./Components/HomeScreen/HomeScreenContainer";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<HomeScreenContainer />} />
    </Routes>
  );
};

export default AppRoutes;
