import React, { useEffect } from "react";
import UserDashboard from "./UserDashboard";
import { fetchBreachTrendsData } from "../../Redux/Slices/BreachTrendsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserDashboardContainer() {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, isAuthenticated, isloading } = useAuth0();
  const { status } = useSelector((state) => state.breachTrendsData);

  useEffect(() => {
    if (!isloading && isAuthenticated) {
      if (status === "empty") {
        dispatch(fetchBreachTrendsData(getAccessTokenSilently));
      }
    }
  }, [dispatch, getAccessTokenSilently]);
  return isAuthenticated && <UserDashboard />;
}
