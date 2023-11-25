import React from "react";
import BreachByYear from "../UserDashboardCharts/BreachByYear/BreachByYear";
import BreachByQuarter from "../UserDashboardCharts/BreachByQuarter/BreachByQuarter";
import { ChartContentWrapper } from "./ChartWrapper.style";
import BreachYearType from "../UserDashboardCharts/BreachYearType/BreachYearType";
import BreachQuarterType from "../UserDashboardCharts/BreachQuarterType/BreachQuarterType";
import PeriodByType from "../UserDashboardCharts/PeriodByType/PeriodByType";
import PeriodBySubject from "../UserDashboardCharts/PeriodBySubjectType/PeriodBySubject";
import BreachTypeFrequency from "../UserDashboardCharts/PeriodMostFrequentBreach/BreachTypeFrequency";
import TimeToReportIncident from "../UserDashboardCharts/PeriodTimeReportIncident/TimeToReportIncident";

const ChartWrapper = (props) => {
  return (
    <ChartContentWrapper>
      <BreachByYear />
      <BreachByQuarter />
      <BreachYearType />
      <BreachQuarterType />
      <PeriodByType />
      <PeriodBySubject />
      <BreachTypeFrequency />
      <TimeToReportIncident />
    </ChartContentWrapper>
  );
};
export default ChartWrapper;
