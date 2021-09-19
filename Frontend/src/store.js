import { configureStore } from "@reduxjs/toolkit";
import detailsModalReducer from "./features/detailsModalSlice";
export const store = configureStore({
  reducer: {
    detailsModal: detailsModalReducer,
  },
});
