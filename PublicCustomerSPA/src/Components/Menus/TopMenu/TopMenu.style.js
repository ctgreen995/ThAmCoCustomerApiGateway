import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu } from "antd";

const TopNavBar = styled(Menu)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.colors.grey};
  border-top: ${(props) =>
    props.theme.name == "light" ? "1px solid white" : "1px solid black"};
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
  .items {
    width: 100%;
  }
`;

const TopNavItem = styled(Menu.Item)`
  height: 100%;
  border-radius: 0px !important;
  color: ${(props) => props.theme.colors.headerText};

  &:hover {
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.colors.headerText} !important;
    border-bottom: 2px solid ${(props) => props.theme.colors.blue} !important;
  }

  &.ant-menu-item-selected {
    border-bottom: ${(props) =>
      props.selected
        ? `4px solid ${props.theme.colors.shadowColor}`
        : "initial"} !important;
    background-color: ${(props) =>
      props.selected ? `${props.theme.colors.blue}` : "initial"} !important;
    color: ${(props) => props.theme.colors.headerText} !important;
    height: 100%;
  }
  text-align: center;
`;

const TopNavLink = styled(Link)`
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 3px;
  text-decoration: none;
  &:hover {
    color: ${(props) => props.theme.colors.text};
  }
`;

const NavButton = styled.button`
  padding: 10px;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.colors.blue};
  }
`;

export { TopNavBar, TopNavLink, NavButton, TopNavItem };
