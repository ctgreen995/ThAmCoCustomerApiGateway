import styled from "styled-components";

const MapWrapper = styled.div`
  display: flex;
  flex: 1;
  padding: 70px 15px 15px 50px;
  width: 600px;
  height: 660px;
  align-items: center;
  @media screen and (max-width: 1400px) {
    width: -webkit-calc(100% - 20px);
    width: -moz-calc(100% - 20px);
    width: calc(100% - 20px);
  }
  @media screen and (max-width: 780px) {
    min-height: 200px;
    min-width: 300px;
  }
`;

const WorldMap = styled.img`
  overflow: hidden;
  height: 90%;
  width: 90%;
  @media screen and (min-width: 1400px) {
  }

  @media screen and (max-width: 480px) {
  }
`;

export { MapWrapper, WorldMap };
