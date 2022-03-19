import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: {
    modalChosen: "",
    battleEntryId: "",
    popup: {
      open: false,
      header: "",
      content: "",
    },
    preloader: false,
  },
  reducers: {
    chooseModal: (state, action) => {
      if (typeof action.payload === "object" && action.payload !== null) {
        state.modalChosen = action.payload.modalChosen;
        state.battleEntryId = action.payload.battleId;
      } else {
        state.modalChosen = action.payload;
      }
    },
    setPopup: (state, action) => {
      state.popup = action.payload;
    },
    setPreloader: (state, action) => {
      state.preloader = action.payload;
    },
  },
});

export const { chooseModal, setPopup, setPreloader } = modalSlice.actions;

export default modalSlice.reducer;
