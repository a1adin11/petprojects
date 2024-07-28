import { createSlice } from "@reduxjs/toolkit";

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

export interface IPizzas {
  pizzaItems: IPizzaItem[];
  IsLoadingReady: boolean;
  cartItems: IPizzaItem[];
}

const initialState: IPizzas = {
  pizzaItems: [],
  cartItems:[],
  IsLoadingReady: true,
};

export const pizzaSlice = createSlice({
  name: "pizzaSlice",
  initialState: initialState,
  reducers: {
    pushPizzaItems: (state, actions) => {
      state.pizzaItems = actions.payload;
    },
    setIsLoadingReady: (state, action) => {
      state.IsLoadingReady = action.payload;
    },
    onAddToCart: (state, action) => {
        state.cartItems = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const { pushPizzaItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
