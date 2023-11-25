import React, { useEffect } from "react";
import {
  LayoutContainer,
  TopRow,
  MainContentWrapper,
  Content,
} from "./Layout.style";
import MainMenu from "../Menus/MainMenu/MainMenu";
import { useSelector, useDispatch } from "react-redux";
import TopMenu from "../Menus/TopMenu/TopMenu";
import { themeSwitched } from "../../Redux/Slices/ThemeSlice";
import { updatePageState } from "../../Redux/Slices/pageStateSlice";

const Layout = (props) => {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.themes);
  const pageState = useSelector((state) => state.pageState);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      dispatch(themeSwitched(localTheme));
    }
    const localPageState = localStorage.getItem("pageState");
    if (localPageState) {
      dispatch(updatePageState(JSON.parse(localPageState)));
    }
  }, [dispatch]);

  console.log(pageState);

  return currentTheme && pageState ? (
    <LayoutContainer>
      <TopRow>
        <MainMenu pageState={pageState} />
      </TopRow>
      <MainContentWrapper>
        {pageState.options && <TopMenu />}
        <Content>{props.children}</Content>
      </MainContentWrapper>
    </LayoutContainer>
  ) : (
    <div>Loading...</div>
  );
};

export default Layout;
