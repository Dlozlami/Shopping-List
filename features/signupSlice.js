import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IP } from "@env";

const initialState = {
  userAdded: 0,
};

export const addUser = createAsyncThunk(
  "signup/addUser",
  async (newUser, thunkAPI) => {
    const url = `http://${IP}:8080/api/signup`;
    console.log(newUser);
    try {
      await axios.post(url, newUser);
      thunkAPI.dispatch(setUserAdded(201));
      setTimeout(() => {
        thunkAPI.dispatch(setUserAdded(0));
      }, 10000); // 10 seconds delay
    } catch (error) {
      console.error(error);
      if (error.response) {
        const status = error.response.status;
        if (status === 400 || status === 500) {
          thunkAPI.dispatch(setUserAdded(status));
        } else {
          thunkAPI.dispatch(setUserAdded(0));
        }
      } else {
        thunkAPI.dispatch(setUserAdded(0));
      }
      throw error;
    }
  }
);

export const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    setUserAdded: (state, action) => {
      state.userAdded = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserAdded } = signupSlice.actions;

export default signupSlice.reducer;
