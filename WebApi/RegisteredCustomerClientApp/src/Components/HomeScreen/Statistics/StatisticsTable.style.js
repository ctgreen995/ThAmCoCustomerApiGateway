import styled from "styled-components";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export const StatisticsTableWrapper = styled.div`
  margin-top: 50px;
  width: 50%;
`;

export const StyledTableContainer = styled(TableContainer).attrs({
  component: Paper,
})`
  width: 50%;
  margin: auto;
`;
export const StyledTable = styled(Table)``;
export const StyledTableBody = styled(TableBody)`
  background-color: ${(props) => props.theme.colors.background};
`;
export const StyledTableCell = styled(TableCell)`
  color: ${(props) => props.theme.colors.text} !important;
  font-size: 18px !important;

  border-right: 1px solid ${(props) => props.theme.colors.text};
  &:last-child {
    border-right: 0;
  }
`;
export const StyledTableHead = styled(TableHead)`
  background-color: ${(props) => props.theme.colors.green};
  border: solid 1px ${(props) => props.theme.colors.text};

  & .MuiTableCell-root {
    color: ${(props) => props.theme.colors.headerText} !important;

    border-right: 1px solid ${(props) => props.theme.colors.text};
    &:last-child {
      border-right: 0;
    }
  }
`;
export const StyledTableRow = styled(TableRow)`
  border: solid 1px ${(props) => props.theme.colors.text};
`;
