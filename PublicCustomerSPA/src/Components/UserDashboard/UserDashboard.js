import React from "react";
import { DashboardWrapper } from "./UserDashboard.style";
import TimeLine from "./TimeLine/Timeline";
import ChartWrapper from "./ChartWrapper/ChartWrapper";
import IncidentTypes from "./IncidentTypes/IncidentTypes";
import { ContentWrapper } from "./ContentWrapper.style";

const UserDashboard = () => {
  return (
    <DashboardWrapper>
      <ContentWrapper>
        <TimeLine />
        <ChartWrapper />
      </ContentWrapper>
      <IncidentTypes />
    </DashboardWrapper>
  );
};

export default UserDashboard;
