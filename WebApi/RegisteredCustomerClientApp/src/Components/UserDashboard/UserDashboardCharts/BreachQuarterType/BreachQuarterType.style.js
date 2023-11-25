import styled from "styled-components";

const BreachByQuarterTypeWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 95%;
  align-items: center;
  flex-direction: column;
  @media screen and (max-width: 480px) {
  }
  @media screen and (max-width: 780px) {
  }
`;

const ChartTitle = styled.h2`
  color: ${(props) => props.theme.colors.bars};
`;

export { BreachByQuarterTypeWrapper, ChartTitle };
