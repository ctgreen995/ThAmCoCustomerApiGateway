import styled from "styled-components";

export const ThemeButton = styled.div`
  font-weight: 600;
  cursor: pointer;
  color: ${(props) => props.theme.colors.headerText};
  &:hover {
    color: ${(props) => props.theme.colors.headerText};
  }
  display: ${(props) => props.display};
  height: 50px;
  padding: 7px 0 5px 50px;
`;
