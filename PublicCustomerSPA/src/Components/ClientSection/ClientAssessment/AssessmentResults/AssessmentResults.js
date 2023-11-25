import React from "react";
import { AssessmentResultsWrapper } from "./AssessmentResults.style";

const AssessmentResults = ({ result: result }) => {
  return (
    <AssessmentResultsWrapper>
      <div style={{ fontSize: "50", color: "white" }}>{result}</div>
    </AssessmentResultsWrapper>
  );
};

export default AssessmentResults;
