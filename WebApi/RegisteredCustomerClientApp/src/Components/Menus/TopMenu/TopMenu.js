import React from "react";
import { TopNavBar, TopNavLink, TopNavItem } from "./TopMenu.style";
import { useSelector } from "react-redux";

const TopMenu = () => {
  const openPage = useSelector((state) => state.pageState);

  return (
    <TopNavBar>
      {openPage.options &&
        openPage.options.map((item) => (
          <TopNavItem
            key={item.key}
            selected={openPage.openSubPage === item.key}
          >
            <TopNavLink to={item.url}>{item.label}</TopNavLink>
          </TopNavItem>
        ))}
    </TopNavBar>
  );
};

export default TopMenu;
