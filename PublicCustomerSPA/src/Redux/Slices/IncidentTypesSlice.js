import { createSlice } from "@reduxjs/toolkit";

const incidentTypesSlice = createSlice({
  name: "incidentTypes",
  initialState: {
    "Alteration of personal data": true,
    "Brute Force": true,
    "Cryptographic flaw": true,
    "Data emailed to incorrect recipient": true,
    "Data of wrong data subject shown in client portal": true,
    "Data posted or faxed to incorrect recipient": true,
    "Denial of service": true,
    "Failure to redact": true,
    "Failure to use bcc": true,
    "Hardware/software misconfiguration": true,
    "Incorrect disposal of hardware": true,
    "Incorrect disposal of paperwork": true,
    "Loss/theft of device containing personal data": true,
    "Loss/theft of paperwork or data left in insecure location": true,
    "Not Provided": true,
    "Other cyber incident": true,
    "Other non-cyber incident": true,
    Phishing: true,
    Ransomware: true,
    "Unauthorised access": true,
    Malware: true,
    "Verbal disclosure of personal data": true,
  },
  reducers: {
    incidentTypesUpdated: (state, action) => {
      return action.payload;
    },
  },
});

export const { incidentTypesUpdated } = incidentTypesSlice.actions;

export default incidentTypesSlice.reducer;
