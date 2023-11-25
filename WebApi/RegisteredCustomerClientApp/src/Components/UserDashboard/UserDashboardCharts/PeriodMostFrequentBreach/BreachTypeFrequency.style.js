import styled from "styled-components";

const BreachTypefrequencyWrapper = styled.div`
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  padding: 15px 15px 15px 15px;
  width: 95%;

  @media screen and (max-width: 480px) {
  }
  @media screen and (max-width: 780px) {
  }
`;

const ChartTitle = styled.h2`
  color: ${(props) => props.theme.colors.bars};
`;

export { BreachTypefrequencyWrapper, ChartTitle };
