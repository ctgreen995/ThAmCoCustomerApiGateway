import React, { useEffect, useState } from "react";
import AssessmentResults from "./AssessmentResults";
import { useAuth0 } from "@auth0/auth0-react";

const AssessmentResultsContainer = () => {
  const { getAccessTokenSilently, user } = useAuth0();

  const [result, setResult] = useState(null);

  const getAssessmentResult = async () => {
    let clientId = user.sub;
    let token = await getAccessTokenSilently();
    const response = await fetch(
      `/Client/Assessment/GetAssessmentResultByClientId/${clientId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (!response.ok) {
      throw new Error(
        "Couldn't get assessment results. " + response.statusText
      );
    }
    return await response.json();
  };

  useEffect(() => {
    getAssessmentResult()
      .then((result) => {
        console.log(result);
        setResult(result.result);
      })
      .catch((error) => {
        console.error("Error fetching assessment result:", error);
      });
  }, []);
  return <AssessmentResults result={result} />;
};

export default AssessmentResultsContainer;
