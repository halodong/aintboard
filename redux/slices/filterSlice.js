import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filters: [], //in the future, can have multiple filters
  },
  reducers: {
    saveFilters: (state, action) => {
      // @TODO use this for adding filters
      //   state.filters = [
      //       ...state.filters,
      //       action.payload
      //   ]
      state.filters = action.payload;
    },
  },
});

export const { saveFilters } = filterSlice.actions;

export default filterSlice.reducer;
