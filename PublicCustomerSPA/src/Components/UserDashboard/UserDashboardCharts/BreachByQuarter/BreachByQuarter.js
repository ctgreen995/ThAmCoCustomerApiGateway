import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  LineChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Line,
} from "recharts";
import { BreachByQuarterWrapper, ChartTitle } from "./BreachByQuarter.style";

const BreachByQuarter = () => {
  const theme = useSelector((state) => state.themes);

  const { data, status, error } = useSelector(
    (state) => state.breachTrendsData
  );

  const timeline = useSelector((state) => state.timeline);

  let chartData = [];
  if (status === "succeeded" && data) {
    const filteredData = data.filter((item) => {
      const yearMatches = timeline.checkedYears.includes(item.year.toString());
      const quarterMatches = timeline.checkedQuarters.includes(item.quarter);
      return yearMatches && quarterMatches;
    });

    const aggregatedData = filteredData.reduce((acc, item) => {
      const year = item.year;
      const quarter = `${item.quarter}`;
      const key = `${year}-${quarter}`;

      if (!acc[key]) {
        acc[key] = { year, quarter, breaches: 0 };
      }

      acc[key].breaches += 1;

      return acc;
    }, {});

    chartData = Object.values(aggregatedData).map((item) => ({
      ...item,
      yearQuarter: `${item.year} ${item.quarter}`,
    }));
  }

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
      <BreachByQuarterWrapper>
        <ChartTitle>Breaches By Quarter</ChartTitle>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.text} />
            <XAxis
              dataKey="yearQuarter"
              stroke={theme.colors.text}
              name="Year & Quarter"
            />
            <YAxis
              dataKey="breaches"
              stroke={theme.colors.text}
              name="Breaches"
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "transparent" }}
            />

            <Legend />
            <Scatter
              name="Breaches by Quarter"
              dataKey="breaches"
              fill={theme.colors.green}
            />
            <Line
              name="Breaches"
              type="monotone"
              dataKey="breaches"
              stroke={theme.colors.green}
              strokeWidth={6}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </BreachByQuarterWrapper>
    );
  }
  return null;
};

export default BreachByQuarter;
