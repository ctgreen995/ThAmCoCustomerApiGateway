import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ChartColours,
  darkenAndPale,
} from "../../Components/Theme/ChartColours";

export const fetchBreachTrendsData = createAsyncThunk(
  "breachTrends/fetchBreachTrendsData",
  async (getAccessTokenSilently) => {
    let token = await getAccessTokenSilently();

    const response = await fetch("/UserDashboard/GetBreachTrendsData", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(
        "Couldn't get breach trends data. " + response.statusText
      );
    }

    const result = await response.json();
    return result;
  }
);

export const newColors = ChartColours.map(darkenAndPale);

const initialState = {
  data: [],
  status: "empty",
  error: null,
  colorMapping: {},
};
const breachTrendsSlice = createSlice({
  name: "breachTrendsData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreachTrendsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBreachTrendsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        const incidentTypes = [
          ...new Set(action.payload.map((item) => item.incidentType)),
        ];
        incidentTypes.forEach((type, index) => {
          state.colorMapping[type] = newColors[index % newColors.length];
        });
      })
      .addCase(fetchBreachTrendsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default breachTrendsSlice.reducer;
