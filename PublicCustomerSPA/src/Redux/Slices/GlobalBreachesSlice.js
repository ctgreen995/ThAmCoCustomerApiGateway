import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGlobalBreaches = createAsyncThunk(
  "globalBreaches/fetch",
  async () => {
    const response = await fetch("/Homescreen/GetGlobalBreaches");
    if (!response.ok) {
      throw new Error("Failed to fetch global breaches");
    }
    return response.json();
  }
);

const globalBreachesSlice = createSlice({
  name: "globalBreaches",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalBreaches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGlobalBreaches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGlobalBreaches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default globalBreachesSlice.reducer;
