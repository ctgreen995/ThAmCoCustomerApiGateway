import styled from "styled-components";

export const LayoutContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    flex-direction: row;
  }
`;

export const TopRow = styled.div`
  height: 75px;
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.colors.darkBlue};
  border-right: 1px solid ${(props) => props.theme.colors.darkBlue};
  text-align: center;
`;

export const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  background-color: ${(props) => props.theme.colors.background};
`;

export const Content = styled.div`
  overflow: auto;
  flex-grow: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
