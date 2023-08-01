//DONT FORGET = npm i react-redux @reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";
import signupReducer from "./features/signupSlice";

export const store = configureStore({
  reducer: {
    signUp: signupReducer,
  },
});
