import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";
import { BreachByYearTypeWrapper, ChartTitle } from "./BreachYearType.style";

const BreachYearType = () => {
  const theme = useSelector((state) => state.themes);
  const colorMapping = useSelector(
    (state) => state.breachTrendsData.colorMapping
  );

  const checkedYears = useSelector((state) => state.timeline.checkedYears);
  const selectedIncidentTypes = useSelector((state) => state.incidentTypes);
  const { data, status, error } = useSelector(
    (state) => state.breachTrendsData
  );

  const aggregateData = () => {
    const agg = {};

    data.forEach((incident) => {
      const { year, incidentType } = incident;

      if (!checkedYears.includes(year.toString())) return;

      if (!agg[year]) {
        agg[year] = { year };
      }

      if (!agg[year][incidentType]) {
        agg[year][incidentType] = 0;
      }

      agg[year][incidentType]++;
    });

    return Object.values(agg);
  };

  const chartData = status === "succeeded" && data ? aggregateData() : [];

  let incidentTypesList = Object.keys(selectedIncidentTypes).filter((type) =>
    chartData.some((item) => item[type] !== undefined)
  );

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  } else if (status === "succeeded") {
    return (
      <BreachByYearTypeWrapper>
        <ChartTitle>Breaches by Year and Type</ChartTitle>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            barSize={150}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.colors.shadowColor}
            />
            <XAxis dataKey="year" stroke={theme.colors.shadowColor} />
            <YAxis
              stroke={theme.colors.shadowColor}
              label={{
                value: "Breaches Count",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip
              contentStyle={{ backgroundColor: theme.colors.shadowColor }}
            />
            <Legend />
            {incidentTypesList.map(
              (key) =>
                selectedIncidentTypes[key] && (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId="a"
                    fill={colorMapping[key]}
                  />
                )
            )}
          </BarChart>
        </ResponsiveContainer>
      </BreachByYearTypeWrapper>
    );
  }
  return null;
};

export default BreachYearType;
