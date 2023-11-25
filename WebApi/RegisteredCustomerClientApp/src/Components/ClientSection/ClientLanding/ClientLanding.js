import React from "react";
import { ClientLandingWrapper, ClientHeader } from "./ClientLanding.style";
import { useNavigate } from "react-router-dom";

const ClientLanding = () => {
  const Navigate = useNavigate();
  const HandleStartAssessment = () => {
    Navigate("/client/assessment");
  };
  return (
    <ClientLandingWrapper>
      <ClientHeader>
        At Xploit we aim to help our clients understand their current risk
        profile
      </ClientHeader>

      <button onClick={() => HandleStartAssessment()}>Start Assessment</button>
    </ClientLandingWrapper>
  );
};

export default ClientLanding;
