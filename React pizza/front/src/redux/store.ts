import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./slices/pizzaSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PizzaApi } from "../API/api";
import filterReducer from "./slices/filterSlice";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const store = configureStore({
  reducer: {
    [PizzaApi.reducerPath]: PizzaApi.reducer,
    pizzaItems: pizzaReducer,
    filterState: filterReducer,
  },
  middleware: (buildGetDefaultMiddleware) =>
    buildGetDefaultMiddleware().concat(PizzaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;