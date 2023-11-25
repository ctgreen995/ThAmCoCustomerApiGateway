import styled from "styled-components";

const ChartContentWrapper = styled.div`
  margin-top: 50px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  row-gap: 150px;
  align-items: center;
  ::-webkit-scrollbar {
    display: none;
  }
`;
export { ChartContentWrapper };
