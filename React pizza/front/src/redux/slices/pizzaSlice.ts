import { createSlice } from "@reduxjs/toolkit";
import { types } from "util";
import { PizzaApi } from "../../API/api";

export interface IPizzaItem {
  id: string;
  url: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export interface ICartItem {
  id: string;
  url: string;
  title: string;
  types: number;
  sizes: number;
  price: number;
}

export interface IPizzas {
  pizzaItems: IPizzaItem[];
  isLoading: boolean;
  cartItems: ICartItem[];
  error: string | undefined;
}

const initialState: IPizzas = {
  pizzaItems: [],
  cartItems: [],
  isLoading: false,
  error: undefined,
};

export const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState: initialState,
  reducers: {
    pushPizzaItems: (state, actions) => {
      state.pizzaItems = actions.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        PizzaApi.endpoints.getAllPizzas.matchFulfilled,
        (state, action) => {
          state.pizzaItems = action.payload;
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addMatcher(PizzaApi.endpoints.getAllPizzas.matchPending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addMatcher(
        PizzaApi.endpoints.getAllPizzas.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

// Action creators are generated for each case reducer function
export const { pushPizzaItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
