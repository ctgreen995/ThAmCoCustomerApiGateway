import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBreachCost = createAsyncThunk(
  "breachCost/fetch",
  async () => {
    const response = await fetch("/Homescreen/GetBreachCosts");
    if (!response.ok) {
      throw new Error("Failed to fetch breach cost");
    }
    return response.json();
  }
);

const breachCostSlice = createSlice({
  name: "breachCost",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreachCost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBreachCost.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchBreachCost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default breachCostSlice.reducer;
