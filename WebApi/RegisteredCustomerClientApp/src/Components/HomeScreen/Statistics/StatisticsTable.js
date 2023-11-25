import React from "react";
import {
  StyledTableContainer,
  StatisticsTableWrapper,
  StyledTable,
  StyledTableCell,
  StyledTableBody,
  StyledTableHead,
  StyledTableRow,
} from "./StatisticsTable.style";

const StatisticsTable = () => {
  const rows = [
    {
      col1: "Proportion of UK businesses identifying cyber attacks each year",
      col2: "39%",
    },
    {
      col1: "Organisations estimating they were attacked at least once a week within the last 12 months",
      col2: "31%",
    },
    {
      col1: "Businesses testing cyber security awareness of staff, such as through mock phishing attack exercises",
      col2: "14-20%",
    },
    {
      col1: "Senior Leadership Team member who rate cyber security as a very high or fairly high priority within their organisation",
      col2: "82%",
    },
    {
      col1: "Businesses regularly undertaking cyber security risk assessments",
      col2: "32-34%",
    },
    {
      col1: "Businesses and Charities with multiple online exposure points such as network device and online payment systems",
      col2: "50% and 59%",
    },
  ];
  return (
    <StatisticsTableWrapper>
      <StyledTableContainer>
        <StyledTable aria-label="Security Statistics">
          <StyledTableHead>
            <StyledTableRow>
              <StyledTableCell>ICO Category</StyledTableCell>
              <StyledTableCell>Statistic</StyledTableCell>
            </StyledTableRow>
          </StyledTableHead>
          <StyledTableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell>{row.col1}</StyledTableCell>
                <StyledTableCell>{row.col2}</StyledTableCell>
              </StyledTableRow>
            ))}
          </StyledTableBody>
        </StyledTable>
      </StyledTableContainer>
    </StatisticsTableWrapper>
  );
};

export default StatisticsTable;
