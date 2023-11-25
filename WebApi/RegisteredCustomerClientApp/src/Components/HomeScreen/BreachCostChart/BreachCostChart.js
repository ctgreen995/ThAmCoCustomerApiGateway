import React from "react";
import { BreachCostChartWrapper } from "./BreachCostChart.style";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";

const BreachCostChart = (props) => {
  const theme = useSelector((state) => {
    return state.themes;
  });

  const data = [["Year", "Lost Revenue"]];
  if (props.breachCost && props.breachCost.length > 0) {
    props.breachCost.forEach((element) => {
      data.push([
        element.year.toLocaleString("en", { useGrouping: false }),
        element.cost != 0 ? element.cost : element.forecastCost,
      ]);
    });
  } else {
    data.push([0, 0]);
  }
  const options = {
    width: "100%",
    height: "660px",
    legend: {
      position: "top",
      maxLines: 3,
      textStyle: {
        color: theme.colors.text,
      },
    },
    bar: { groupWidth: "75%" },
    colors: [theme.colors.green],
    title: "Total Cost Per Data Breach - UK",
    hAxis: {
      textStyle: {
        color: theme.colors.text,
      },
    },
    vAxis: {
      textStyle: {
        color: theme.colors.text,
      },
      gridlines: {
        color: "transparent",
      },
    },
    backgroundColor: theme.colors.background,
    backdropFilter: "blur(5px)",
    webkitBackdropFilter: "blur(5px)",
    titleTextStyle: {
      color: theme.colors.text,
    },
    bars: "vertical",
    chartArea: {
      left: 95,
      width: "90%",
      height: "85%",
    },
  };

  return (
    <BreachCostChartWrapper>
      <Chart chartType="ColumnChart" data={data} options={options} />
    </BreachCostChartWrapper>
  );
};
export default BreachCostChart;
