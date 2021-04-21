import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalChosen: "",
    popup: {
      open: false,
      header: "",
      content: "",
    },
  },
  reducers: {
    chooseModal: (state, action) => {
      state.modalChosen = action.payload;
    },
    setPopup: (state, action) => {
      state.popup = action.payload;
    },
  },
});

export const { chooseModal, setPopup } = modalSlice.actions;

export default modalSlice.reducer;
