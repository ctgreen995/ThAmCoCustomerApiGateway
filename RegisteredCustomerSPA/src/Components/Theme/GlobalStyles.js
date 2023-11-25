import { createGlobalStyle } from "styled-components";
import * as theme from "./Theme.style";

export const GlobalStyles = createGlobalStyle`

body {
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-family: monospace;
  overflow-x: hidden;
}

.light {
    border: 0 4px 30px ${(props) => props.theme};
    background-color: ${theme.light.colors.background};
  }
  .dark {
    border: 0 4px 30px ${(props) => props.theme};
    background-color: ${theme.dark.colors.background};
  }
  .active{
    border: 0 4px 30px ${props => props.theme};
    display: block;
  }
`;
