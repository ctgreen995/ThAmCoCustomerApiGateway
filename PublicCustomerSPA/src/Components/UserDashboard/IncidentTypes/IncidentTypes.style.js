import styled from "styled-components";
import { Checkbox } from "@mui/material";

export const IncidentTypesWrapper = styled.div`
  height: 100vh;
  overflow-y: auto;
  padding: 50px;

  .label {
    padding-top: 5px;
    padding-bottom: 50px;
    font-size: 25px;
    color: ${(props) => props.theme.colors.text};
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  &.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate {
    color: ${(props) => props.theme.colors.green};
  }
`;
