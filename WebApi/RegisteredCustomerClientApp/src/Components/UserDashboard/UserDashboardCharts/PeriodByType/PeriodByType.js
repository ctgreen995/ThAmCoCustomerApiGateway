import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { ChartTitle, PeriodByTypeWrapper } from "./PeriodByType.style";

const PeriodByType = () => {
  const { data, status, error } = useSelector(
    (state) => state.breachTrendsData
  );
  const theme = useSelector((state) => state.themes);
  const colorMapping = useSelector(
    (state) => state.breachTrendsData.colorMapping
  );

  const activeIncidentTypes = useSelector((state) => state.incidentTypes);

  let aggregatedData = [];

  // Determine if no incident types are selected
  const noTypesSelected = !Object.values(activeIncidentTypes).some(Boolean);

  if (status === "succeeded" && data) {
    data.forEach((incident) => {
      if (activeIncidentTypes[incident.incidentType]) {
        const existingIncident = aggregatedData.find(
          (item) => item.name === incident.incidentType
        );
        if (existingIncident) {
          existingIncident.value += 1;
        } else {
          aggregatedData.push({ name: incident.incidentType, value: 1 });
        }
      }
    });

    if (noTypesSelected) {
      // Add placeholder data if no incident types are selected
      aggregatedData.push({ name: "No Selection", value: 1 });
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  } else if (status === "succeeded") {
    return (
      <PeriodByTypeWrapper>
        <ChartTitle>Breaches by Type</ChartTitle>
        <ResponsiveContainer width="100%" height={800}>
          <PieChart>
            <Pie
              dataKey="value"
              data={aggregatedData}
              outerRadius={300}
              innerRadius={220}
              fill={theme.colors.shadowColor}
            >
              {aggregatedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    entry.name === "No Selection"
                      ? theme.colors.bars
                      : colorMapping[entry.name]
                  }
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: theme.colors.shadowColor }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </PeriodByTypeWrapper>
    );
  }
};

export default PeriodByType;
