import React from "react";
import { useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";
import { ChartTitle, PeriodBySubjectWrapper } from "./PeriodBySubject.style";

const PeriodBySubject = () => {
  const { data, status, error } = useSelector(
    (state) => state.breachTrendsData
  );
  const theme = useSelector((state) => state.themes);

  const aggregateBySubject = () => {
    const aggregatedData = {};

    data.forEach((incident) => {
      const subjectType = incident.dataSubjectType;

      // Check if the subject type already exists in the aggregated data
      if (aggregatedData[subjectType]) {
        aggregatedData[subjectType]++;
      } else {
        aggregatedData[subjectType] = 1;
      }
    });

    // Convert the aggregated data object into an array
    return Object.entries(aggregatedData).map(
      ([subjectType, totalBreaches]) => ({
        subjectType:
          subjectType === "Customers or prospective customers"
            ? "Customers"
            : subjectType,
        totalBreaches,
      })
    );
  };

  let aggregatedData =
    status === "succeeded" && data ? aggregateBySubject() : [];

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  } else if (status === "succeeded") {
    return (
      <PeriodBySubjectWrapper>
        <ChartTitle>Breaches by Subject Type</ChartTitle>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            data={aggregatedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={theme.colors.text} />
            <XAxis dataKey="subjectType" stroke={theme.colors.text} />
            <YAxis
              stroke={theme.colors.text}
              label={{
                value: "Total Breaches",
                angle: -90,
                position: "insideLeft",
              }}
            />
            {/* <Tooltip
              contentStyle={{ backgroundColor: theme.colors.green }}
              cursor={{ fill: "transparent" }}
            /> */}
            <Legend />
            <Bar
              dataKey="totalBreaches" // Use the total breaches as the data key
              fill={theme.colors.green}
            />
          </BarChart>
        </ResponsiveContainer>
      </PeriodBySubjectWrapper>
    );
  }

  return null;
};

export default PeriodBySubject;
