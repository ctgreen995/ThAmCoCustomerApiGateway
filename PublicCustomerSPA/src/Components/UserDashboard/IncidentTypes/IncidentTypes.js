import React from "react";
import { IncidentTypesWrapper, StyledCheckbox } from "./IncidentTypes.style";
import { useDispatch } from "react-redux";
import { incidentTypesUpdated } from "../../../Redux/Slices/IncidentTypesSlice";
import { FormGroup, FormControlLabel, FormLabel } from "@mui/material";
import { useSelector } from "react-redux";

const IncidentTypes = () => {
  const dispatch = useDispatch();
  const activeIncidentTypes = useSelector((state) => state.incidentTypes);

  const handleIncidentTypeChange = (event) => {
    const { name, checked } = event.target;

    if (name === "selectAll") {
      const updatedIncidentTypes = Object.keys(activeIncidentTypes).reduce(
        (acc, type) => {
          acc[type] = checked;
          return acc;
        },
        {}
      );
      dispatch(incidentTypesUpdated(updatedIncidentTypes));
    } else {
      dispatch(
        incidentTypesUpdated({
          ...activeIncidentTypes,
          [name]: checked,
        })
      );
    }
  };

  return (
    <IncidentTypesWrapper>
      <FormGroup>
        <FormLabel className="label">Incident Types</FormLabel>
        <FormControlLabel
          control={
            <StyledCheckbox
              checked={Object.values(activeIncidentTypes).every(Boolean)}
              onChange={handleIncidentTypeChange}
              name="selectAll"
            />
          }
          label="Select All"
        />
        {Object.keys(activeIncidentTypes).map((type) => (
          <FormControlLabel
            key={type}
            control={
              <StyledCheckbox
                checked={activeIncidentTypes[type]}
                onChange={handleIncidentTypeChange}
                name={type}
              />
            }
            label={type}
          />
        ))}
      </FormGroup>
    </IncidentTypesWrapper>
  );
};

export default IncidentTypes;
