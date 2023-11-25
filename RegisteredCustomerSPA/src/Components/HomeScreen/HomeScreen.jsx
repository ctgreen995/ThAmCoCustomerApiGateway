import React, { useEffect } from "react";
import { GetAttacksButton, HomeScreenWrapper } from "./HomeScreen.style";
import { useAuth0 } from "@auth0/auth0-react";
// import { useSelector } from "react-redux";

const HomeScreen = (props) => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    console.log(props.data);
  }, [props.data]);

  return (
    <HomeScreenWrapper>
      <button onClick={() => props.fetch()}>Fetch</button>
      {props.data}
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
