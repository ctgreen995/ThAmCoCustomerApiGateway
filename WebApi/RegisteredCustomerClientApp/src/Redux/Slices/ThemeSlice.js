import { createSlice } from "@reduxjs/toolkit";
import { dark, light } from "../../Components/Theme/Theme.style";

const themeSlice = createSlice({
  name: "themes",
  initialState: dark,
  reducers: {
    themeSwitched: (state, action) => {
      return action.payload === "dark" ? dark : light;
    },
  },
});

export const { themeSwitched } = themeSlice.actions;

export default themeSlice.reducer;
