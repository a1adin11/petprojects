import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPizzaRequest } from "../types";
import { ICartItem, IPizzaItem } from "../redux/slices/pizzaSlice";

export const PizzaApi = createApi({
  reducerPath: "PizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Pizzas", "CartItems", "CartItem"],
  endpoints: (builder) => ({
    getAllPizzas: builder.query<IPizzaItem[], IPizzaRequest>({
      query: (request) => ({
        url: "items?",
        method: "GET",
        params: {
          ...request,
        },
      }),
      providesTags: () => [{ type: "Pizzas" }],
    }),
    getCartItems: builder.query<ICartItem[], void>({
      query: () => "/cartItems",
      providesTags: () => [{ type: "CartItems" }],
    }),
    addCartItem: builder.mutation<ICartItem, ICartItem>({
      query: (newItem) => ({
        url: "/cartItems",
        method: "POST",
        body: newItem,
      }),
      invalidatesTags: [{ type: "CartItem" }],
    }),
  }),
});

export const {
  useGetAllPizzasQuery,
  useGetCartItemsQuery,
  useAddCartItemMutation,
} = PizzaApi;
