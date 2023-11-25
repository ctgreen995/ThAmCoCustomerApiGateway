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
import {
  BreachByQuarterTypeWrapper,
  ChartTitle,
} from "./BreachQuarterType.style";

const BreachQuarterType = () => {
  const theme = useSelector((state) => state.themes);
  const colorMapping = useSelector(
    (state) => state.breachTrendsData.colorMapping
  );

  const { data, status, error } = useSelector(
    (state) => state.breachTrendsData
  );
  const timeline = useSelector((state) => state.timeline);
  const selectedIncidentTypes = useSelector((state) => state.incidentTypes);

  let chartData = [];

  if (status === "succeeded" && data) {
    const filteredData = data.filter((item) => {
      const yearMatches = timeline.checkedYears.includes(item.year.toString());
      const quarterMatches = timeline.checkedQuarters.includes(item.quarter);
      return yearMatches && quarterMatches;
    });

    filteredData.forEach((incident) => {
      const yearQuarter = `${incident.year} ${incident.quarter}`;
      const key = `${yearQuarter}_${incident.incidentType}`;
      const existingItem = chartData.find((item) => item.id === key);
      if (existingItem) {
        existingItem.count += 1;
      } else {
        chartData.push({
          id: key,
          year: incident.year,
          quarter: incident.quarter,
          incidentType: incident.incidentType,
          count: 1,
        });
      }
    });

    chartData = chartData.sort((a, b) => {
      if (a.year !== b.year) {
        return a.year - b.year;
      }

      const aQ = parseInt(a.quarter.replace("Qtr", "").replace("Q", ""), 10);
      const bQ = parseInt(b.quarter.replace("Qtr", "").replace("Q", ""), 10);

      return aQ - bQ;
    });

    chartData = chartData.map((item) => ({
      ...item,
      yearQuarter: ` ${item.quarter.replace("Qtr ", "Q")} ${item.year}`,
    }));
  }

  let allIncidentTypes = new Set();
  chartData.forEach((item) => {
    allIncidentTypes.add(item.incidentType);
  });

  const sortedIncidentTypes = Array.from(allIncidentTypes).sort(
    (a, b) =>
      Object.keys(selectedIncidentTypes).indexOf(a) -
      Object.keys(selectedIncidentTypes).indexOf(b)
  );

  const initializeAggregatedData = () => {
    const yearQuarters = chartData.map((item) => item.yearQuarter);
    const uniqueYearQuarters = [...new Set(yearQuarters)];

    return uniqueYearQuarters.map((yearQuarter) => ({
      yearQuarter,
      ...Array.from(allIncidentTypes).reduce((acc, incidentType) => {
        acc[incidentType] = 0;
        return acc;
      }, {}),
    }));
  };

  let aggregatedData = initializeAggregatedData();

  chartData.forEach((dataItem) => {
    const foundItem = aggregatedData.find(
      (item) => item.yearQuarter === dataItem.yearQuarter
    );
    if (foundItem && selectedIncidentTypes[dataItem.incidentType]) {
      foundItem[dataItem.incidentType] =
        (foundItem[dataItem.incidentType] || 0) + dataItem.count;
    }
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  } else if (status === "succeeded") {
    return (
      <BreachByQuarterTypeWrapper>
        <ChartTitle>Breaches by Quarter and Type</ChartTitle>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={theme.colors.shadowColor}
            />
            <XAxis dataKey="yearQuarter" stroke={theme.colors.shadowColor} />
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
            {sortedIncidentTypes.map(
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
      </BreachByQuarterTypeWrapper>
    );
  }
  return null;
};

export default BreachQuarterType;
