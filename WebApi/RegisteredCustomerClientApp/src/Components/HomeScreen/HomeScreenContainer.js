import React, { useEffect, useState } from "react";
import HomeScreen from "./HomeScreen";

export default function HomeScreenContainer() {
  const [breachCost, setBreachCost] = useState([]);
  const [globalBreaches, setGlobalBreaches] = useState([]);
  const getBreachCost = async () => {
    try {
      const response = await fetch("/Homescreen/GetBreachCosts", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(
          "Couldn't get breach costs data. " + response.statusText
        );
      }

      const result = await response.json();
      setBreachCost(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const getGlobalBreaches = async () => {
    try {
      const response = await fetch("/Homescreen/GetGlobalBreaches", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(
          "Couldn't get global breach data. " + response.statusText
        );
      }

      const result = await response.json();
      setGlobalBreaches(result);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    getBreachCost();
    getGlobalBreaches();
  }, []);

  return <HomeScreen breachCost={breachCost} globalBreaches={globalBreaches} />;
}
