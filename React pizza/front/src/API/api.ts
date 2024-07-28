import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPizzaRequest } from "../types";
import { IPizzaItem } from "../redux/slices/pizzaSlice";

export const PizzaApi = createApi({
  reducerPath: "PizzaApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Pizzas"],
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
  }),
});

export const { useGetAllPizzasQuery } = PizzaApi;
