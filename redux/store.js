import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import modalReducer from "./slices/modalSlice";
import bgReducer from "./slices/bgSlice";
import reviewFormReducer from "./slices/reviewFormSlice";
import strategyFormReducer from "./slices/strategyFormSlice";

import loggerMiddleware from "./middleware/logger";

export default configureStore({
  reducer: {
    filter: filterReducer,
    modal: modalReducer,
    bg: bgReducer,
    reviewForm: reviewFormReducer,
    strategyForm: strategyFormReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware),
});
