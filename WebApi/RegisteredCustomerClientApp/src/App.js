import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Components/Loader/Loader";
import Layout from "./Components/Layout/Layout";
import AppRoutes from "./AppRoutes";

const App = () => {
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
};
export default App;
