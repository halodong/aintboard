import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import modalReducer from "./slices/modalSlice";

import loggerMiddleware from "./middleware/logger";

export default configureStore({
  reducer: {
    filter: filterReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware),
});
