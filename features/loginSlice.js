import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IP } from "@env";
import jwt_decode from "jwt-decode";

const initialState = {
  isLoggedIn: 0,
};

// Utility function to store the JWT in SecureStore
const storeJWTInSecureStore = async (jwt) => {
  try {
    await SecureStore.setItemAsync("jwt", jwt);
  } catch (error) {
    console.error("Error storing JWT in SecureStore:", error);
  }
};

export const refreshLogin = createAsyncThunk(
  "login/refreshLogin",
  async (_, thunkAPI) => {
    try {
      const jwt = await SecureStore.getItemAsync("jwt");
      if (jwt) {
        thunkAPI.dispatch(setIsLoggedIn(200));
      }
    } catch (error) {
      console.error("refreshLogin: Error decoding JWT:", error);
      return null;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "login/logoutUser",
  async (_, thunkAPI) => {
    //console.log("login/logoutUser");
    try {
      // Remove the JWT from SecureStore
      await SecureStore.deleteItemAsync("jwt");

      // Set isLoggedIn to 0 to indicate that the user is logged out
      thunkAPI.dispatch(setIsLoggedIn(0));
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (user, thunkAPI) => {
    const url = `http://${IP}:8080/api/login`;

    try {
      const response = await axios.post(url, user);
      await storeJWTInSecureStore(response.data.token);
      thunkAPI.dispatch(setIsLoggedIn(200));
    } catch (error) {
      console.error(error);
      if (error.response) {
        const status = error.response.status;
        if (status === 401 || status === 500) {
          thunkAPI.dispatch(setIsLoggedIn(status));
          setTimeout(() => {
            thunkAPI.dispatch(setIsLoggedIn(0));
          }, 3000);
        } else {
          thunkAPI.dispatch(setIsLoggedIn(0));
        }
      } else {
        thunkAPI.dispatch(setIsLoggedIn(0));
      }
      throw error;
    }
  }
);

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLoggedIn } = loginSlice.actions;

export default loginSlice.reducer;
