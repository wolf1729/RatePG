// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from "../Store/User/userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer
  },
});

export default store;