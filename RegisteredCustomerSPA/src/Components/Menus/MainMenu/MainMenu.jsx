import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  NavBar,
  NavLink,
  NavButton,
  NavItem,
  NavMenu,
  LogoHolder,
} from "./MainMenu.style";
import { useDispatch, useSelector } from "react-redux";
// import { NavbarBrand } from "reactstrap";
import { ThemeButton } from "../../Theme/ThemeButton.style";
import { themeSwitched } from "../../../Redux/Slices/ThemeSlice";
import { updatePageState } from "../../../Redux/Slices/pageStateSlice";

const MainMenu = ({ pageState: pageState }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loginWithPopup, loginWithRedirect, logout } =
    useAuth0();

  const currentTheme = useSelector((state) => state.themes);

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });

  const HandleLogin = () => {
    if (!isAuthenticated) {
      loginWithPopup();
    }
  };

  const HandleDarkClick = () => {
    dispatch(themeSwitched("light"));
    localStorage.setItem("theme", "light");
  };
  const HandleLightClick = () => {
    dispatch(themeSwitched("dark"));
    localStorage.setItem("theme", "dark");
  };
  const handlePageUpdate = (page) => {
    dispatch(updatePageState({ openPage: page }));
  };
  useEffect(() => {}, []);

  return pageState.openPage ? (
    <NavBar color={currentTheme}>
      <LogoHolder>
        {/* <NavbarBrand href="/">
          <img
            src={logo}
            alt="Logo"
            style={{ width: "125px", height: "60px" }}
          />
        </NavbarBrand> */}
        <ThemeButton
          onClick={() => HandleDarkClick()}
          display={currentTheme.name === "light" ? "none" : "block"}
        >
          LIGHT MODE
        </ThemeButton>
        <ThemeButton
          onClick={() => HandleLightClick()}
          display={currentTheme.name === "dark" ? "none" : "block"}
        >
          DARK MODE
        </ThemeButton>
      </LogoHolder>
      <NavMenu>
        <NavItem selected={pageState.openPage === "home"}>
          <NavLink tag={Link} to="/" onClick={() => handlePageUpdate("home")}>
            Home
          </NavLink>
        </NavItem>
        {!isAuthenticated && (
          <>
            <NavItem>
              <NavButton
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: { screen_hint: "signup" },
                  })
                }
              >
                Register
              </NavButton>
            </NavItem>
            <NavItem>
              <NavButton onClick={() => HandleLogin()}>Login</NavButton>
            </NavItem>
          </>
        )}
        {isAuthenticated && (
          <>
            <NavItem>
              <NavButton onClick={() => logoutWithRedirect()}>Logout</NavButton>
            </NavItem>
          </>
        )}
      </NavMenu>
    </NavBar>
  ) : (
    <div>... loading</div>
  );
};
export default MainMenu;
