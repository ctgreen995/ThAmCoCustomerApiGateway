import React from "react";
import { Route, Routes } from "react-router-dom";
import AssessmentContainer from "./ClientAssessment/Assessment/AssessmentContainer";
import AssessmentResultsContainer from "./ClientAssessment/AssessmentResults/AssessmentResultsContainer";
import ClientProfileContainer from "./ClientProfile/ClientProfileContainer";
import ClientLandingContainer from "./ClientLanding/ClientLandingContainer";

const ClientSection = () => {
  return (
    <Routes>
      <Route index element={<ClientLandingContainer />} />
      <Route path="assessment" element={<AssessmentContainer />} />
      <Route path="profile" element={<ClientProfileContainer />} />
      <Route path="results" element={<AssessmentResultsContainer />} />
    </Routes>
  );
};
export default ClientSection;
