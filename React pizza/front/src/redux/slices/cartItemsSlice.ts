import { createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { stat } from "fs";
import { act } from "react-dom/test-utils";
import CartItemBlock from "../../components_TS/CartItemBlock";
import { PizzaApi } from "../../API/api";

//FIXME: extraReduser отдаёт undefinded, это странно

export interface ICartItem {
  id: string;
  url: string;
  title: string;
  types: number;
  sizes: number;
  price: number;
}

export interface ICartItemList {
  cartItems: ICartItem[];
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ICartItemList = {
  cartItems: [],
  isLoading: false,
  error: undefined,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    onAddToCart: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
      console.log(action.type);
    },
  },
  extraReducers(builder) {
    builder
      .addMatcher(
        PizzaApi.endpoints.getCartItems.matchFulfilled,
        (state, action) => {
          state.cartItems = action.payload;
          state.isLoading = false;
          state.error = undefined;
        }
      )
      .addMatcher(PizzaApi.endpoints.getCartItems.matchPending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addMatcher(
        PizzaApi.endpoints.getCartItems.matchRejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.error.message;
        }
      );
  },
});

export const { onAddToCart } = filterSlice.actions;

export default filterSlice.reducer;
