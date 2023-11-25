import React, { useEffect, useState } from "react";
import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import {
  AssessmentWrapper,
  FormColumn,
  StyledForm,
  FormItem,
  SubmitButton,
  ColumnsWrapper,
  StyledRadioGroup,
  StyledSelect,
  StyledMenuItem,
} from "./Assessment.style";
import { pink } from "@mui/material/colors";

const Assessment = ({
  formQuestions,
  initialAssessmentData,
  submitData,
  updateData,
}) => {
  const [formData, setFormData] = useState(initialAssessmentData || {});
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    if (initialAssessmentData) {
      console.log(initialAssessmentData);
      setFormData(initialAssessmentData);
    }
  }, [initialAssessmentData]);

  return (
    <AssessmentWrapper>
      <h1>Client Assessment</h1>
      <StyledForm
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData.entries());

          let allRequiredFieldsFilled = true;
          formQuestions.forEach((question) => {
            if (question.required && !values[question.name]) {
              allRequiredFieldsFilled = false;
            }
          });

          if (allRequiredFieldsFilled && initialAssessmentData) {
            updateData(values);
          } else if (allRequiredFieldsFilled) {
            submitData(values);
          } else {
            setFieldError("Please fill out all required fields.");
          }
        }}
      >
        <ColumnsWrapper>
          {Array.from({ length: 3 }, (_, colIndex) => (
            <FormColumn key={colIndex}>
              {formQuestions
                .slice(
                  Math.ceil((colIndex * formQuestions.length) / 3),
                  Math.ceil(((colIndex + 1) * formQuestions.length) / 3)
                )
                .map((question) => (
                  <FormItem component="fieldset" key={question.name}>
                    <FormLabel component="legend">{question.label}</FormLabel>
                    {question.name === "marketSector" ? (
                      <StyledSelect
                        name={question.name}
                        required={question.required}
                        value={
                          formData[question.name] !== undefined
                            ? formData[question.name]
                            : "none"
                        }
                        onChange={(e) => {
                          const newFormData = {
                            ...formData,
                            [question.name]: parseInt(e.target.value, 10),
                          };
                          setFormData(newFormData);
                        }}
                      >
                        <StyledMenuItem value="none" disabled>
                          {question.placeholder}
                        </StyledMenuItem>
                        {question.options.map((sector) => (
                          <StyledMenuItem key={sector.key} value={sector.key}>
                            {sector.value}
                          </StyledMenuItem>
                        ))}
                      </StyledSelect>
                    ) : (
                      <StyledRadioGroup>
                        <RadioGroup
                          name={question.name}
                          value={
                            formData[question.name] !== undefined
                              ? formData[question.name]
                              : ""
                          }
                          onChange={(e) => {
                            const newFormData = {
                              ...formData,
                              [question.name]: e.target.value,
                            };
                            setFormData(newFormData);
                          }}
                        >
                          {question.options.map((option) => (
                            <FormControlLabel
                              key={option.key}
                              value={option.key}
                              control={
                                <Radio
                                  sx={{
                                    color: pink[800],
                                    "&.Mui-checked": {
                                      color: pink[600],
                                    },
                                    required: question.required,
                                  }}
                                />
                              }
                              label={option.value}
                            />
                          ))}
                        </RadioGroup>
                      </StyledRadioGroup>
                    )}
                  </FormItem>
                ))}
            </FormColumn>
          ))}
        </ColumnsWrapper>
        <div style={{ display: "flex" }}>
          <SubmitButton
            id="submitButton"
            type="submit"
            variant="contained"
            color="primary"
          >
            Submit
          </SubmitButton>
          <div
            style={{ color: "red", paddingLeft: "10px", paddingTop: "12px" }}
          >
            {fieldError}
          </div>
        </div>
      </StyledForm>
    </AssessmentWrapper>
  );
};

export default Assessment;
