import React, { useEffect, useState } from "react";
import Assessment from "./Assessment";
import { useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import { updatePageState } from "../../../../Redux/Slices/pageStateSlice";
import { Loader } from "../../../Loader/Loader.style";
import { formQuestions } from "../AssessmentQuestions";
import { useNavigate } from "react-router-dom";

const AssessmentContainer = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [initialAssessmentData, setInitialAssessmentData] = useState(null);

  const getAssessmentData = async () => {
    let token = await getAccessTokenSilently();
    let clientId = user.sub;
    try {
      const response = await fetch(
        `/Client/Assessment/GetAssessmentDataById/${clientId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!response.ok) {
        throw new Error("Couldn't get assessment data. " + response.statusText);
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("There was an error fetching the data:", error);
      throw error;
    }
  };

  const submitAssessmentData = async (values) => {
    let token = await getAccessTokenSilently();

    if (user.sub) {
      let clientId = user.sub;
      try {
        const response = await fetch("/Client/Assessment/AddAssessmentData", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ clientId, ...values }),
        });

        if (response.ok) {
          alert("Data Submitted Successfully");
          navigate("/client/results");
        } else {
          throw new Error(
            "Couldn't submit assessment data. " + response.statusText
          );
        }
      } catch (error) {
        console.error("There was an error submitting the data:", error);
      }
    }
  };

  const updateAssessmentData = async (values) => {
    let token = await getAccessTokenSilently();
    let clientId = user.sub;
    try {
      const response = await fetch(`/Client/Assessment/UpdateAssessmentData`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId, ...values }),
      });

      if (response.ok) {
        alert("Data Updated Successfully");
        navigate("/client/results");
      } else {
        throw new Error(
          "Couldn't update assessment data. " + response.statusText
        );
      }
    } catch (error) {
      console.error("There was an error updating the data:", error);
      throw error;
    }
  };

  let questions = formQuestions();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      dispatch(
        updatePageState({
          openSubPage: "assessment",
        })
      );
    }
  }, [dispatch, isLoading, isAuthenticated]);

  const fetchData = async () => {
    try {
      const data = await getAssessmentData();
      console.log(data);
      setInitialAssessmentData(data);
    } catch (error) {
      console.error("Could not fetch initial assessment data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Assessment
      initialAssessmentData={initialAssessmentData}
      submitData={submitAssessmentData}
      updateData={updateAssessmentData}
      formQuestions={questions}
    />
  );
};

export default AssessmentContainer;
