import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import modalReducer from "./slices/modalSlice";
import bgReducer from "./slices/bgSlice";
import reviewFormReducer from "./slices/reviewFormSlice";

import loggerMiddleware from "./middleware/logger";

export default configureStore({
  reducer: {
    filter: filterReducer,
    modal: modalReducer,
    bg: bgReducer,
    reviewForm: reviewFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware),
});
