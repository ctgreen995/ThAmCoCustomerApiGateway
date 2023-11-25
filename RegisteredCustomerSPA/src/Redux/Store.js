import { configureStore } from "@reduxjs/toolkit";
import themesReducer from "./Slices/ThemeSlice";
import pageStateReducer from "./Slices/pageStateSlice";

const store = configureStore({
  reducer: {
    themes: themesReducer,
    pageState: pageStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {},
    }),
});

export default store;
