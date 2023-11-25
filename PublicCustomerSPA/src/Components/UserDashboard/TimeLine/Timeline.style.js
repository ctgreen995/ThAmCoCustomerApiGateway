import styled from "styled-components";
import { Checkbox } from "@mui/material";

export const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2%;

  padding: 50px;
  justify-content: center;

  .label {
    padding-right: 50px;
    font-size: 25px;
    color: ${(props) => props.theme.colors.text};
    padding-top: 5px;
  }
`;
export const Years = styled.div``;
export const Quarters = styled.div``;

export const StyledCheckbox = styled(Checkbox)`
  &.css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.Mui-checked,
  .css-12wnr2w-MuiButtonBase-root-MuiCheckbox-root.MuiCheckbox-indeterminate {
    color: ${(props) => props.theme.colors.green};
  }
`;
