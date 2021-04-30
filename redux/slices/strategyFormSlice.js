import { createSlice } from "@reduxjs/toolkit";

export const strategyFormSlice = createSlice({
  name: "strategyForm",
  initialState: {
    strategyFormValues: {
      bgName: "",
      strategyContent: "",
      images: [],
      strategyTitle: "",
      language: "",
      youtubeUrl: "",
    },
  },
  reducers: {
    setStrategyFormValues: (state, action) => {
      state.strategyFormValues[action.payload.name] = action.payload.value;
    },
    resetStrategyFormValues: (state) => {
      state.strategyFormValues = {
        bgName: "",
        strategyContent: "",
        images: [],
        strategyTitle: "",
        language: "",
        youtubeUrl: "",
      };
    },
  },
});

export const {
  setStrategyFormValues,
  resetStrategyFormValues,
} = strategyFormSlice.actions;

export default strategyFormSlice.reducer;
