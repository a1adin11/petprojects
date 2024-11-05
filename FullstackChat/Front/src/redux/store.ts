import { configureStore } from "@reduxjs/toolkit";
import { Api } from "../redux/api";
import tagsReducer from "./slices/tagsSlice";
import { authMiddleware } from "../utils/authMiddleware";
// import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const store = configureStore({
  reducer: {
    [Api.reducerPath]: Api.reducer,
    tagsState: tagsReducer,
    // usersState: pizzaReducer,
    // filterState: filterReducer,
    // cartItemsState: cartItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(Api.middleware)
      .prepend(authMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
