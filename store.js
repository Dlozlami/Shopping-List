//DONT FORGET = npm i react-redux @reduxjs/toolkit
import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./features/signupSlice";
import loginReducer from "./features/loginSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    logIn: loginReducer,
  },
});
