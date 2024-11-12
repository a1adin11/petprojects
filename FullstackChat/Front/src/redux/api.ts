import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IRequestLogin,
  IRequestPost,
  IRequestRegister,
  IResponseAttachments,
  IResponseRegister,
} from "../types";

export const Api = createApi({
  reducerPath: "Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5050/",
    prepareHeaders: (headers) => {
      const token: string | null = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User", "Post"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IResponseRegister, IRequestRegister>({
      query: (request) => ({
        url: "auth/register",
        method: "POST",
        body: {
          ...request,
        },
      }),
      invalidatesTags: () => [{ type: "User" }],
    }),
    loginUser: builder.mutation<IResponseRegister, IRequestLogin>({
      query: (request) => ({
        url: "auth/login",
        method: "POST",
        body: {
          ...request,
        },
      }),
      invalidatesTags: () => [{ type: "User" }],
    }),
    // getPosts: builder.query<>({
    //   query: () => "/posts",
    //   providesTags: () => [{ type: "Post"}],
    // }),

    addPost: builder.mutation<void, IRequestPost>({
      query: (formData) => ({
        url: "/posts", // Замените на ваш URL-адрес
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
    // removePost: builder.mutation<>({
    //     query: (newItem) => ({
    //       url: "/cartItems",
    //       method: "POST",
    //       body: newItem,
    //     }),
    //     invalidatesTags: [{ type: }],
    // }),
    // likePost: builder.mutation<>({
    //     query: (newItem) => ({
    //       url: "/cartItems",
    //       method: "POST",
    //       body: newItem,
    //     }),
    //     invalidatesTags: [{ type: }],
    // }),
    addAttachments: builder.mutation<IResponseAttachments, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Post" }],
    }),
  }),
});

export const {
  useAddAttachmentsMutation,
  //   useGetAllPizzasQuery,
  //   useGetCartItemsQuery,
  //   useAddCartItemMutation,
  useAddPostMutation,
  useLoginUserMutation,
  useRegisterUserMutation,
} = Api;
