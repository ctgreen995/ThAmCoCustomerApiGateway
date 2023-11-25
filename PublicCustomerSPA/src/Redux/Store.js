import { configureStore } from "@reduxjs/toolkit";
import themesReducer from "./Slices/ThemeSlice";
import timelineReducer from "./Slices/TimelineSlice";
import incidentTypesReducer from "./Slices/IncidentTypesSlice";
import breachCostReducer from "./Slices/BreachCostSlice";
import globalBreachesReducer from "./Slices/GlobalBreachesSlice";
import breachTrendsReducer from "./Slices/BreachTrendsSlice";
import pageStateReducer from "./Slices/pageStateSlice";

const store = configureStore({
  reducer: {
    themes: themesReducer,
    timeline: timelineReducer,
    incidentTypes: incidentTypesReducer,
    breachTrendsData: breachTrendsReducer,
    breachCost: breachCostReducer,
    globalBreaches: globalBreachesReducer,
    pageState: pageStateReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {},
    }),
});

export default store;
