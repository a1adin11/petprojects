import { createListenerMiddleware } from "@reduxjs/toolkit";
import { Api } from "../redux/api";

export const authMiddleware = createListenerMiddleware();

authMiddleware.startListening({
  matcher: Api.endpoints.registerUser.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("access_token", action.payload.token);
    }
  },
});

authMiddleware.startListening({
  matcher: Api.endpoints.loginUser.matchFulfilled,
  effect: async (action, listenerApi) => {
    listenerApi.cancelActiveListeners();

    if (action.payload.token) {
      localStorage.setItem("access_token", action.payload.token);
    }
  },
});
