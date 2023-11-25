import styled from "styled-components";

const BreachByYearTypeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 95%;

  @media screen and (max-width: 480px) {
  }
  @media screen and (max-width: 780px) {
  }
`;

const ChartTitle = styled.h2`
  color: ${(props) => props.theme.colors.bars};
`;
export { BreachByYearTypeWrapper, ChartTitle };
