import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";

import loggerMiddleware from "./middleware/logger";

export default configureStore({
  reducer: {
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware),
});
