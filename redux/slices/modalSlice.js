import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalChosen: "",
  },
  reducers: {
    chooseModal: (state, action) => {
      state.modalChosen = action.payload;
    },
  },
});

export const { chooseModal } = modalSlice.actions;

export default modalSlice.reducer;
