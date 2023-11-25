import styled from "styled-components";

const HomeScreenWrapper = styled.div`
  background: ${(props) => props.theme.colors.background};
  align-items: center;
  margin: 30px;
`;

const GetAttacksButton = styled.button`
  left: 25%;
  top: 10%;
`;

export { HomeScreenWrapper, GetAttacksButton };
