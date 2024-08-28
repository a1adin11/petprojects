import { configureStore } from "@reduxjs/toolkit";
import pizzaReducer from "./slices/pizzaSlice";
import { PizzaApi } from "../API/api";
import filterReducer from "./slices/filterSlice";
import cartItemsReducer from "./slices/cartItemsSlice";
import { buildGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

export const store = configureStore({
  reducer: {
    [PizzaApi.reducerPath]: PizzaApi.reducer,
    pizzaItemsState: pizzaReducer,
    filterState: filterReducer,
    cartItemsState: cartItemsReducer,
  },
  middleware: (buildGetDefaultMiddleware) =>
    buildGetDefaultMiddleware().concat(PizzaApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
