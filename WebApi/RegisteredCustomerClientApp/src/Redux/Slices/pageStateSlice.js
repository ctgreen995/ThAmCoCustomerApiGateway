import { createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
  const localPage = localStorage.getItem("pageState");
  if (localPage) {
    console.log(localPage);
    return JSON.parse(localPage);
  }
  return { openPage: "home", openSubPage: "", options: [] };
};

const openPageSlice = createSlice({
  name: "pageState",
  initialState: getInitialState(),
  reducers: {
    updatePageState: (state, action) => {
      const updatedState = { ...state, ...action.payload };
      Object.assign(state, updatedState);
      localStorage.setItem("pageState", JSON.stringify(updatedState));
    },
  },
  extraReducers: (builder) => {},
});

export const { updatePageState } = openPageSlice.actions;

export default openPageSlice.reducer;
