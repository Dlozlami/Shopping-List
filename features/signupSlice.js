import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IP } from "@env";

const initialState = {
  userAdded: false,
};

export const addUser = createAsyncThunk(
  "signup/addUser",
  async (newUser, thunkAPI) => {
    const url = `http://${IP}:8080/api/signup`;
    console.log(newUser);
    try {
      await axios.post(url, newUser);
      thunkAPI.dispatch(setUserAdded(true));
      setTimeout(() => {
        thunkAPI.dispatch(setUserAdded(false));
      }, 10000); // 10 seconds delay
    } catch (error) {
      console.error(error);
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
