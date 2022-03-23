import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

// NOTE: Add the different stores to the reducer method.
export const store = configureStore({
  reducer: {
    authSlice
  }
})