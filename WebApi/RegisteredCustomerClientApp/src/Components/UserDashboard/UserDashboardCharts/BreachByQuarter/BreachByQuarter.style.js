import styled from "styled-components";

const BreachByQuarterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 95%;
  align-items: center;
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-width: 780px) {
  }
`;
const ChartTitle = styled.h2`
  color: ${(props) => props.theme.colors.bars};
`;

export { BreachByQuarterWrapper, ChartTitle };
