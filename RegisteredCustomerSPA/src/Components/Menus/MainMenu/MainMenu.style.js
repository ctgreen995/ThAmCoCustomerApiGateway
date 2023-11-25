import styled from "styled-components";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import { Menu } from "antd";

export const NavBar = styled(Layout)`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100%;
  justify-content: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.darkBlue};
`;

export const NavMenu = styled(Menu)`
  text-align: center;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.darkBlue};
  .items {
    width: 100%;
  }
`;

export const NavItem = styled(Menu.Item)`
  width: 100% !important;
  height: 100% !important;
  border-radius: 0px !important;
  color: ${(props) => props.theme.colors.headerText};
  border-bottom: ${(props) =>
    props.selected ? "2px solid white" : "none"} !important;

  &:hover {
    color: ${(props) => props.theme.colors.text} !important;
    border-bottom: 2px solid ${(props) => props.theme.colors.darkblue} !important;
  }
  &.ant-menu-item-selected {
    border-bottom: ${(props) =>
      props.selected
        ? `2px solid ${props.theme.colors.white}`
        : "initial"} !important;

    background-color: ${(props) =>
      props.selected ? `${props.theme.colors.darkBlue}` : "initial"} !important;
    color: ${(props) => props.theme.colors.headerText} !important;
  }
  text-align: center;
  padding-top: 10px;
`;

export const NavLink = styled(Link)`
  margin-left: 3px;
  text-decoration: none;
  font-size: 1.5em;
`;

export const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: ${(props) => props.theme.colors.headerText};

  &:hover {
    color: ${(props) => props.theme.colors.headerText};
  }
`;
export const LogoHolder = styled.div`
  margin: 5px 0 5px 20px;
  background-color: ${(props) => props.theme.colors.darkblue};
  display: flex;
  flex-direction: row;
`;
