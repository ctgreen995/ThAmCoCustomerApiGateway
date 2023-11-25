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
import { BreachByYearWrapper, ChartTitle } from "./BreachByYear.style";

const BreachByYear = () => {
  const theme = useSelector((state) => state.themes);

  const { data, status, error } = useSelector(
    (state) => state.breachTrendsData
  );
  const timeline = useSelector((state) => state.timeline);
  let chartData = [];

  if (status === "succeeded" && data) {
    const filteredData = data.filter((item) => {
      return timeline.checkedYears.includes(item.year.toString());
    });

    const aggregatedData = filteredData.reduce((acc, item) => {
      const year = item.year;

      if (!acc[year]) {
        acc[year] = { year, breaches: 0 };
      }

      acc[year].breaches += 1;

      return acc;
    }, {});
    chartData = Object.values(aggregatedData).sort((a, b) => a.year - b.year);
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: theme.colors.green,
            border: `1px solid ${theme.colors.text}`,
            padding: "10px",
          }}
        >
          <p>{`Breaches: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  } else if (status === "succeeded") {
    return (
      <BreachByYearWrapper>
        <ChartTitle>Breaches by Year</ChartTitle>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.silver} />
            <XAxis dataKey="year" stroke={theme.colors.silver} />
            <YAxis stroke={theme.colors.silver} />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />
            <Legend />
            <Bar
              dataKey="breaches"
              name="Breaches"
              fill={theme.colors.green}
              barSize={150}
            />
          </BarChart>
        </ResponsiveContainer>
      </BreachByYearWrapper>
    );
  }
  return null;
};

export default BreachByYear;
