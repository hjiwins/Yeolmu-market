import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {
      isLoggedIn: false,
      userId: null,
      token: null,
      username: null,
      avatar: null,
    },
  },
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        userData: {
          ...state.userData,
          isLoggedIn: true,
          userId: action.payload.userId,
          username: action.payload.username,
          avatar: action.payload.avatar,
          token: action.payload.token,
        },
      };
    },
    logout: (state) => {
      return {
        ...state,
        userData: {
          ...state.userData,
          isLoggedIn: false,
          userId: null,
          token: null,
          username: null,
          avatar: null,
        },
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
