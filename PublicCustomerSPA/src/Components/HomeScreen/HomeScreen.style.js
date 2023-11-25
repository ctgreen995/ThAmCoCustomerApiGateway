import styled from "styled-components";

const HomeScreenWrapper = styled.div`
  background: ${(props) => props.theme.colors.background};
  align-items: center;
  margin: 30px;
  height: 100%;
`;

const FixContainer = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  flex-basis: auto;

  > div {
    flex-grow: 1;
    margin: 30px;
    width: 300px;
    height: 450px;
    border-radius: 16px;
    box-shadow: 0 4px 30px ${(props) => props.theme.colors.shadowColor};
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.075);
  }

  @media screen and (max-width: 1920px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 3%;
    grid-row-gap: 3.1%;
    > div {
      width: -webkit-calc(100% - 30px);
      width: -moz-calc(100% - 30px);
      width: calc(100% - 30px);
    }
  }

  @media screen and (max-width: 1080px) {
    display: grid;
    grid-template-columns: 45% repeat(1, 1fr);
    grid-column-gap: 50px;
    grid-row-gap: 100px;
    > div {
      display: flex;
      flex-grow: 1;
      max-height: 500px;
      width: -webkit-calc(100%-30px);
      width: -moz-calc(100%-30px);
      width: calc(100%-30px);
    }
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 50px;
    > div {
      display: flex;
      flex-grow: 1;
      max-height: 500px;
      width: -webkit-calc(100% - 20px);
      width: -moz-calc(100% - 20px);
      width: calc(100% - 20px);
    }
  }
`;

const GraphicContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 50px;
  align-items: center;
  > div {
    flex: 1;

    width: -webkit-calc(100% - 20px);
    width: -moz-calc(100% - 20px);
    width: calc(100% - 20px);
    // border-radius: 16px;
    // box-shadow: 0 4px 30px ${(props) => props.theme.colors.shadowColor};
    // backdrop-filter: blur(5px);
    // -webkit-backdrop-filter: blur(5px);
    // border: 1px solid rgba(255, 255, 255, 0.075);
  }

  @media screen and (max-width: 1080px) {
    flex-direction: column;
  }
`;

const GetAttacksButton = styled.button`
  left: 25%;
  top: 10%;
`;

export { HomeScreenWrapper, GetAttacksButton, FixContainer, GraphicContainer };
