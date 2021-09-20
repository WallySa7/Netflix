import { createSlice } from "@reduxjs/toolkit";

const body = document.querySelector("body");

const initialState = {
  value: {
    id: null,
    title: null,
    description: null,
    img: null,
    vote: null,
    year: null,
    seasons: null,
    isLoading: true,
    isOpened: false,
  },
};

export const detailsModalSlice = createSlice({
  name: "detailsModal",
  initialState: initialState,
  reducers: {
    openDetails: (state) => {
      state.value = { ...state.value, isOpened: true };
      body.style.overflow = "hidden";
    },
    openDetailsAndSetLoading: (state) => {
      state.value = { ...initialState.value, isOpened: true };
      body.style.overflow = "hidden";
    },
    updateDetails: (state, action) => {
      state.value = action.payload;
    },
    closeDetails: (state) => {
      state.value = { ...state.value, isOpened: false };
      body.style.overflow = "";
    },
  },
});

export const {
  openDetails,
  openDetailsAndSetLoading,
  updateDetails,
  closeDetails,
} = detailsModalSlice.actions;

export default detailsModalSlice.reducer;
