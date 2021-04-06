import { createSlice } from "@reduxjs/toolkit";

export const bgSlice = createSlice({
  name: "bg",
  initialState: {
    bgSearched: {
      bgName: "",
      bgId: "",
      bgYear: "",
      bgImage: "",
    },
  },
  reducers: {
    searchBg: (state, action) => {
      state.bgSearched = action.payload;
    },
  },
});

export const { searchBg } = bgSlice.actions;

export default bgSlice.reducer;
