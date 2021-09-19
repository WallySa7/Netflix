import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: null,
    title: null,
    description: null,
    isLoading: true,
    isOpened: false,
  },
};

export const detailsModalSlice = createSlice({
  name: "detailsModal",
  initialState: initialState,
  reducers: {
    updateDetails: (state, action) => {
      state.value = action.payload;
    },
    openDetails: (state) => {
      state.value = { ...initialState.value, isOpened: true };
      const body = document.querySelector("body");
      body.style.overflow = "hidden";
    },
    closeDetails: (state) => {
      state.value = { ...state, isOpened: false };
      const body = document.querySelector("body");
      body.style.overflow = "";
    },
  },
});

export const { openDetails, closeDetails, updateDetails } =
  detailsModalSlice.actions;

export default detailsModalSlice.reducer;
