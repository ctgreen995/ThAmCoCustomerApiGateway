import React, { useEffect, useState } from "react";
import ClientProfile from "./ClientProfile";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";

const ClientProfileContainer = () => {
  const dispatch = useDispatch();
  const { getAccessTokenSilently, user, isLoading, isAuthenticated } =
    useAuth0();
  const [clientData, setClientData] = useState(null);

  const getClientData = async () => {
    let token = await getAccessTokenSilently();
    let clientId = user.sub;
    const response = await fetch(
      `/Client/Profile/GetClientDataById/${clientId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!response.ok) {
      throw new Error("Couldn't get client data. " + response.statusText);
    }

    const result = await response.json();
    console.log(result);
    return result;
  };

  const submitClientData = async (values) => {
    if (!user) {
      throw new Error("User not found");
    }
    let clientId = user.sub;
    let token = await getAccessTokenSilently();
    const response = await fetch("/Client/Profile/UpdateClientData", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: { clientId, ...values },
    });
    if (!response.ok) {
      throw new Error("Couldn't submit client data. " + response.statusText);
    }
    const result = await response.json();
    return result;
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user && user.sub) {
        getClientData()
          .then((data) => setClientData(data))
          .catch((err) => console.error(err));
      }
    }
  }, [dispatch, isLoading, isAuthenticated]);

  return <ClientProfile clientData={clientData} onSubmit={submitClientData} />;
};

export default ClientProfileContainer;
