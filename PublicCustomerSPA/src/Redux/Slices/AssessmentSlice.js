import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMarketSectorsData = createAsyncThunk(
  "assessment/fetchMarketSectorsData",
  async (getAccessTokenSilently) => {
    let token = await getAccessTokenSilently();

    const response = await fetch("/Assessment/GetMarketSectorsData", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error(
        "Couldn't get market sectors data. " + response.statusText
      );
    }

    const result = await response.json();
    return result;
  }
);

export const onSubmitData = createAsyncThunk(
  "assessment/onSubmitData",
  async ({ clientId, getAccessTokenSilently, ...data }) => {
    let token = await getAccessTokenSilently();

    const requestData = { clientId, ...data };

    console.log(requestData);

    const response = await fetch("/Assessment/AddAssessmentData", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`Failed to Add the Data to the Database`);
    }

    const result = await response.json();
    if (result === "success") {
      alert("Data Added Successfully");
    } else {
      throw new Error(`Failed to Add the Data to the Database`);
    }
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};
const assessmentSlice = createSlice({
  name: "assessmentData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarketSectorsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMarketSectorsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchMarketSectorsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default assessmentSlice.reducer;
