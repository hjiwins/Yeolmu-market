import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {
      isLoggedIn: false,
      userId: null,
      token: null, // Wait for JWT implementation on the backend
      username: null,
    },
  },
  reducers: {
    register: (state, action) => {
      state.userData = {
        ...state.userData,
        isLoggedIn: true,
        userId: action.payload.userId,
        username: action.payload.username,
      };
    },
    login: (state, action) => {
      return {
        ...state,
        userData: {
          ...state.userData,
          isLoggedIn: true,
          userId: action.payload.userId,
          username: action.payload.username,
        },
      };
    },
  },
});

export const { register, login } = authSlice.actions;
export default authSlice.reducer;
