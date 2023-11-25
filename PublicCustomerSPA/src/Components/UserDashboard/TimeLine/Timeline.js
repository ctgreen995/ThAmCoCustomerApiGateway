import React, { useEffect, useState } from "react";
import {
  TimelineWrapper,
  Years,
  Quarters,
  StyledCheckbox,
} from "./Timeline.style";
import { FormGroup, FormControlLabel, FormLabel } from "@mui/material";
import { useDispatch } from "react-redux";
import { timelineUpdated } from "../../../Redux/Slices/TimelineSlice";

const TimeLine = () => {
  const dispatch = useDispatch();
  const [years, setYears] = useState({
    2019: true,
    2020: true,
    2021: true,
    2022: true,
  });
  const [quarters, setQuarters] = useState({
    "Qtr 1": true,
    "Qtr 2": true,
    "Qtr 3": true,
    "Qtr 4": true,
  });

  const handleYearChange = (event) => {
    if (event.target.name === "selectAllYears") {
      const selectAllValue = event.target.checked;
      const updatedYears = Object.keys(years).reduce((acc, year) => {
        acc[year] = selectAllValue;
        return acc;
      }, {});
      setYears(updatedYears);
    } else {
      setYears({
        ...years,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const handleQuarterChange = (event) => {
    if (event.target.name === "selectAllQuarters") {
      const selectAllValue = event.target.checked;
      const updatedQuarters = Object.keys(quarters).reduce((acc, quarter) => {
        acc[quarter] = selectAllValue;
        return acc;
      }, {});
      setQuarters(updatedQuarters);
    } else {
      setQuarters({
        ...quarters,
        [event.target.name]: event.target.checked,
      });
    }
  };

  const getCheckedYears = () => {
    return Object.keys(years).filter((year) => years[year]);
  };

  const getCheckedQuarters = () => {
    return Object.keys(quarters).filter((quarter) => quarters[quarter]);
  };

  useEffect(() => {
    dispatch(
      timelineUpdated({
        checkedYears: getCheckedYears(),
        checkedQuarters: getCheckedQuarters(),
      })
    );
  }, [years, quarters]);

  return (
    <TimelineWrapper>
      <Years>
        <FormGroup row sx={{ gap: "50px" }}>
          <FormLabel className="label">Year</FormLabel>
          <FormControlLabel
            control={
              <StyledCheckbox
                checked={Object.values(years).every(Boolean)}
                onChange={handleYearChange}
                name="selectAllYears"
              />
            }
            label="Select All"
          />
          {Object.keys(years).map((year) => (
            <FormControlLabel
              key={year}
              control={<StyledCheckbox />}
              onChange={handleYearChange}
              name={year}
              label={year}
              checked={years[year]}
            />
          ))}
        </FormGroup>
      </Years>
      <Quarters>
        <FormGroup row sx={{ gap: "50px" }}>
          <FormLabel className="label">Quarter</FormLabel>
          <FormControlLabel
            control={
              <StyledCheckbox
                checked={Object.values(quarters).every(Boolean)}
                onChange={handleQuarterChange}
                name="selectAllQuarters"
              />
            }
            label="Select All"
          />
          {Object.keys(quarters).map((quarter) => (
            <FormControlLabel
              key={quarter}
              control={<StyledCheckbox />}
              onChange={handleQuarterChange}
              name={quarter}
              label={quarter}
              checked={quarters[quarter]}
            />
          ))}
        </FormGroup>
      </Quarters>
    </TimelineWrapper>
  );
};
export default TimeLine;
