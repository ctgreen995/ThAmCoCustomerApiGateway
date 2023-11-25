import { createSlice } from "@reduxjs/toolkit";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    checkedYears: [],
    checkedQuarters: [],
  },
  reducers: {
    timelineUpdated: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { timelineUpdated } = timelineSlice.actions;

export default timelineSlice.reducer;
