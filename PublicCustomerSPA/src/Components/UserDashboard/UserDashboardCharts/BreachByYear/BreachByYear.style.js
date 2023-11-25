import styled from "styled-components";

const BreachByYearWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px; // minimum width of 500px
  min-height: 600px; // minimum height of 600px
  width: 95%; // grow with screen size
  height: 95%; // grow with screen size
`;

const ChartTitle = styled.h2`
  color: ${(props) => props.theme.colors.text};
`;

export { BreachByYearWrapper, ChartTitle };
