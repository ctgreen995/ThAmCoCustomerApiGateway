import React, { useEffect } from "react";
import {
  LayoutContainer,
  TopRow,
  MainContentWrapper,
  Content,
} from "./Layout.style";
import MainMenu from "../Menus/MainMenu/MainMenu";
import { useSelector, useDispatch } from "react-redux";
import { themeSwitched } from "../../Redux/Slices/ThemeSlice";
import { updatePageState } from "../../Redux/Slices/pageStateSlice";
import { GlobalStyles } from "../Theme/GlobalStyles";
import { ThemeProvider } from "styled-components";

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
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <TopRow>
          <MainMenu pageState={pageState} />
        </TopRow>
        <MainContentWrapper>
          {/* {pageState.options && <SubMenu />} */}
          <Content>{props.children}</Content>
        </MainContentWrapper>
      </ThemeProvider>
    </LayoutContainer>
  ) : (
    <div>Loading...</div>
  );
};

export default Layout;
