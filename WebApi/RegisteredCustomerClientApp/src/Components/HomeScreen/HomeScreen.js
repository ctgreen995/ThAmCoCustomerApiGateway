import React from "react";
import { HomeScreenWrapper, GraphicContainer } from "./HomeScreen.style";
import HeatMap from "./HeatMap/HeatMap";
import BreachCostChart from "./BreachCostChart/BreachCostChart";
import StatisticsTable from "./Statistics/StatisticsTable";

const HomeScreen = (props) => {
  return (
    <HomeScreenWrapper>
      <GraphicContainer>
        <BreachCostChart breachCost={props.breachCost} />
        <HeatMap globalBreaches={props.globalBreaches} />
      </GraphicContainer>
      <StatisticsTable />
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
