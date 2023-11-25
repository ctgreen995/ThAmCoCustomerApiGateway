import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  XAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  ChartTitle,
  TimeReportIncidentWrapper,
} from "./TimeToReportIncident.style";
import { newColors } from "../../../../Redux/Slices/BreachTrendsSlice";

const TimeToReportIncident = () => {
  const { data, status, error } = useSelector(
    (state) => state.breachTrendsData
  );
  const theme = useSelector((state) => state.themes);
  const selectedIncidentTypes = useSelector((state) => state.incidentTypes);
  const colorMapping = useSelector(
    (state) => state.breachTrendsData.colorMapping
  );

  let aggregatedData = [];

  if (status === "succeeded" && data) {
    const timeReportMapping = {};

    data.forEach((item) => {
      if (!timeReportMapping[item.incidentType]) {
        timeReportMapping[item.incidentType] = {};
      }
      if (!timeReportMapping[item.incidentType][item.timeTakenToReport]) {
        timeReportMapping[item.incidentType][item.timeTakenToReport] = 0;
      }
      timeReportMapping[item.incidentType][item.timeTakenToReport]++;
    });

    aggregatedData = Object.entries(timeReportMapping).map(
      ([incidentType, timeReportObj]) => ({
        incidentType,
        ...timeReportObj,
      })
    );

    // Extract ordering from selectedIncidentTypes
    const orderedIncidentTypes = Object.keys(selectedIncidentTypes);

    // Sort aggregatedData based on the order of selectedIncidentTypes
    aggregatedData.sort(
      (a, b) =>
        orderedIncidentTypes.indexOf(a.incidentType) -
        orderedIncidentTypes.indexOf(b.incidentType)
    );

    aggregatedData = aggregatedData.filter(
      ({ incidentType }) => selectedIncidentTypes[incidentType]
    );
  }

  function convertTimeToMinutes(timeString) {
    if (timeString === "Less than 24 hours") {
      return 23 * 60 + 59; // 23 hours 59 minutes
    } else if (timeString === "More than 1 week") {
      return 7 * 24 * 60 + 1; // 1 week + 1 minute
    } else if (timeString === "72 hours to 1 week") {
      return (3 * 24 + 12) * 60; // 4 days 12 hours
    } else if (timeString === "24 hours to 72 hours") {
      return 2 * 24 * 60; // 48 hours (2 days)
    } else {
      // This part is just in case there are other strings not covered
      let numericValue = parseInt(timeString.replace(/\D/g, ""), 10);
      if (timeString.includes("hour")) {
        return numericValue * 60;
      } else if (timeString.includes("day")) {
        return numericValue * 24 * 60;
      } else if (timeString.includes("week")) {
        return numericValue * 7 * 24 * 60;
      }
    }
    return 0; // default value
  }

  const CustomTimeReportLegend = ({ timeReports, theme }) => (
    <div style={{ marginBottom: "20px", display: "flex", gap: "50px" }}>
      {timeReports.map((timeReport, index) => (
        <div
          key={timeReport}
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
            marginBottom: "5px",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              backgroundColor: newColors[index % newColors.length],
              marginRight: "5px",
            }}
          />
          {timeReport}
        </div>
      ))}
    </div>
  );

  const customPayload = aggregatedData.map((item, index) => ({
    value: item.incidentType,
    type: "square",
    id: item.incidentType,
    color: colorMapping[item.incidentType],
  }));
  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  } else if (status === "succeeded") {
    const timeReports = Array.from(
      new Set(data.map((item) => item.timeTakenToReport))
    ).sort((a, b) => convertTimeToMinutes(a) - convertTimeToMinutes(b));

    const CustomTooltip = ({ active, payload, label }) => {
      if (active && payload && payload.length) {
        return (
          <div className="custom-tooltip">
            <p>{`Incident Type: ${label}`}</p>
            {payload.map((entry) => (
              <p key={entry.name}>{`${entry.name}: ${entry.value}`}</p>
            ))}
          </div>
        );
      }
      return null;
    };

    return (
      <TimeReportIncidentWrapper>
        <ChartTitle>Time Taken to Report Incident</ChartTitle>
        <CustomTimeReportLegend timeReports={timeReports} theme={theme} />
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.silver} />
            <YAxis stroke={theme.colors.shadowColor} />
            <XAxis dataKey="incidentType" stroke={theme.colors.grey} hide />
            <Tooltip content={<CustomTooltip />} />
            {timeReports.map((timeReport, index) => (
              <Bar
                key={timeReport}
                dataKey={timeReport}
                name={timeReport}
                stackId="a"
                fill={newColors[index % newColors.length]}
              />
            ))}
            <Legend
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 10 }}
              payload={customPayload}
            />
          </BarChart>
        </ResponsiveContainer>
      </TimeReportIncidentWrapper>
    );
  }
};

export default TimeToReportIncident;
