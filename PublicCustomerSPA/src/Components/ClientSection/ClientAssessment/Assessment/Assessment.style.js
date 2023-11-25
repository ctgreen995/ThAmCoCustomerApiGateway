import styled from "styled-components";
import {
  Button,
  FormControl,
  RadioGroup as MuiRadioGroup,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
} from "@mui/material";

export const StyledForm = styled("form")`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const FormItem = styled(FormControl)`
  float: left;
  padding: 0 10px;
  margin-bottom: 20px;
  display: flex;
  flex-grow: 0;
  .MuiFormLabel-root {
    text-align: start;
    color: ${(props) => props.theme.colors.text};
    white-space: normal;
    overflow-wrap: break-word;
    width: 100%;
    margin-bottom: 10px;
    display: block;
    padding: 5px;
    font-size: 16px;
  }

  .MuiFormLabel-root.Mui-focused,
  .MuiFormLabel-root.Mui-checked {
    color: ${(props) => props.theme.colors.text};
  }
`;

export const FormColumn = styled("div")`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const StyledRadioGroup = styled(MuiRadioGroup)`
  display: flex;
  flex-direction: row;
  gap: 8px;

  .MuiFormControlLabel-root {
    margin-left: 15px;
    margin-right: 15px;
    flex: 1 1 calc(33.333% - 8px);
    color: ${(props) => props.theme.colors.bars};

    font-size: 24px;
  }
`;
export const StyledMenuItem = styled(MuiMenuItem)`
  color: ${(props) => props.theme.colors.bars} !important;
  background-color: ${(props) => props.theme.colors.background} !important;

  &:hover {
    background-color: ${(props) =>
      props.theme.colors.hoverBackground} !important;
  }
`;

export const StyledSelect = styled(MuiSelect)`
  height: 40px;
  width: 75% !important;
  margin: 20px 0 20px 0;
  color: ${(props) => props.theme.colors.bars} !important};
  font-size: 16px;
  background-color: ${(props) => props.theme.colors.background} !important;

  .MuiInputBase-root::placeholder {
    color: ${(props) => props.theme.colors.text} !important;
    opacity: 1; // required for proper placeholder color
  }

  .MuiSelect-nativeInput {
    color: ${(props) => props.theme.colors.text} !important;
  }

  .MuiSvgIcon-root {
    color: ${(props) => props.theme.colors.bars} !important;
  }

  .MuiMenuItem-root {
    color: ${(props) => props.theme.colors.bars};
    background-color: ${(props) => props.theme.colors.background};
  }

  &.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.bars} !important;
  }

  &:hover .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.bars} !important;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme.colors.bars} !important;
  }
`;

export const AssessmentWrapper = styled("div")`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  padding: 20px;
  background-color: ${(props) => props.theme.colors.background};
  height: 96.5%;

  h1 {
    margin-bottom: 30px;
    color: ${(props) => props.theme.colors.bars};
    font-weight: bold;
  }
`;

export const SubmitButton = styled(Button)`
  width: 150px;
  height: 50px;
  display: block;
  margin: 20px auto;
  background-color: ${(props) => props.theme.colors.shadowColor};
`;

export const ColumnsWrapper = styled("div")`
  display: flex;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
