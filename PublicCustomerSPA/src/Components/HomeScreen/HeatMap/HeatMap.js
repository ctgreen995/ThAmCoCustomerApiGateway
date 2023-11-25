import React from "react";
// import worldMap from "../../../Images/worldMap.png";
import "./HeatMap.style.js";
import { MapWrapper } from "./HeatMap.style.js";
import { useSelector } from "react-redux";
import { Chart } from "react-google-charts";

const HeatMap = (props) => {
  const theme = useSelector((state) => {
    return state.themes;
  });
  const data = [["Country", "Data Breaches"]];
  if (props.globalBreaches) {
    props.globalBreaches.forEach((element) => {
      data.push([
        { v: element.code, f: element.country },
        element.dataBreaches,
      ]);
    });
  }
  const options = {
    title: "Global Data Breaches",
    width: "100%",
    height: "100%",
    region: "world",
    colorAxis: {
      colors: ["#ffbf00", "#ff8000", "#ff6600", "#ff4000", "#ff0000"],
    },
    keepAspectRatio: true,
    backgroundColor: theme.colors.background,
    datalessRegionColor: "#8B8000",
    defaultColor: "#f5f5f5",
    is3D: true,
    chartArea: { width: "60%", height: "85%", left: 90 },
  };
  return (
    <MapWrapper color={theme}>
      <Chart
        chartEvents={[
          {
            eventName: "select",
            callback: ({ chartWrapper }) => {
              const chart = chartWrapper.getChart();
              const selection = chart.getSelection();
              if (selection.length === 0) return;
              const region = data[selection[0].row + 1];
              console.log("Selected : " + region);
            },
          },
        ]}
        chartType="GeoChart"
        data={data}
        options={options}
      />
    </MapWrapper>
  );
};

export default HeatMap;
