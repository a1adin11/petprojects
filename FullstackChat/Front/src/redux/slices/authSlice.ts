import { createSlice } from "@reduxjs/toolkit";

export interface IUserItem {
  id: string;
  fullName: string;
  email: string;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  token: string;
}

interface IUserItems {
  authUser: IUserItem | null;
}

const initialState: IUserItems = {
  authUser: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.authUser = null;
    },
  },
  // extraReducers: {

  // }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
