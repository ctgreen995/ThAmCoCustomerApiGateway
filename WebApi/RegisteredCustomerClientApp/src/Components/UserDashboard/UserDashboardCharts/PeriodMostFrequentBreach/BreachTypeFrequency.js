import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  YAxis,
  Cell,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  BreachTypefrequencyWrapper,
  ChartTitle,
} from "./BreachTypeFrequency.style";

const BreachTypeFrequency = () => {
  const { data, status, error } = useSelector(
    (state) => state.breachTrendsData
  );
  const theme = useSelector((state) => state.themes);
  const colorMapping = useSelector(
    (state) => state.breachTrendsData.colorMapping
  );

  // Fetch the ordered list of selected incident types
  const selectedIncidentTypesOrder = Object.keys(
    useSelector((state) => state.incidentTypes)
  );

  const activeIncidentTypes = useSelector((state) => state.incidentTypes);

  let aggregatedData = [];

  if (status === "succeeded" && data) {
    const frequencyByType = {};
    data.forEach((item) => {
      if (activeIncidentTypes[item.incidentType]) {
        // Check if this incident type is active
        if (!frequencyByType[item.incidentType]) {
          frequencyByType[item.incidentType] = 0;
        }
        frequencyByType[item.incidentType]++;
      }
    });

    aggregatedData = Object.entries(frequencyByType).map(
      ([incidentType, frequency]) => ({ incidentType, frequency })
    );

    // Sort aggregatedData based on the order in selectedIncidentTypesOrder
    aggregatedData.sort(
      (a, b) =>
        selectedIncidentTypesOrder.indexOf(a.incidentType) -
        selectedIncidentTypesOrder.indexOf(b.incidentType)
    );
  }

  const legendPayload = aggregatedData.map((entry) => ({
    type: "square",
    value: entry.incidentType,
    color: colorMapping[entry.incidentType],
  }));

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  } else if (status === "succeeded") {
    return (
      <BreachTypefrequencyWrapper>
        <ChartTitle>Most Frequent Breach Types</ChartTitle>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.colors.shadowColor}
            />
            <YAxis
              stroke={theme.colors.shadowColor}
              label={{
                value: "Frequency",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: theme.colors.shadowColor }}
            />
            <Legend
              payload={legendPayload}
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 10 }}
            />
            <Bar dataKey="frequency" name="Incident Type">
              {aggregatedData.map((entry) => (
                <Cell
                  key={`cell-${entry.incidentType}`}
                  fill={colorMapping[entry.incidentType]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </BreachTypefrequencyWrapper>
    );
  }
};

export default BreachTypeFrequency;
