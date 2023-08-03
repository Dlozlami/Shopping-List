import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IP } from "@env";

const initialState = {
  user_lists: [], // Updated key name to 'lists' to represent a list of lists.
};

// Thunk to get data from an endpoint
export const fetchLists = createAsyncThunk(
  "list/fetchLists",
  async (email, thunkAPI) => {
    try {
      const response = await axios.get(`http://${IP}:8080/api/lists`, email);
      return response.data;
    } catch (error) {
      console.error("Error fetching lists:", error);
      throw error;
    }
  }
);

export const createList = createAsyncThunk(
  "list/createList",
  async (listData, thunkAPI) => {
    console.log("ListData", listData);
    try {
      const response = await axios.post(
        `http://${IP}:8080/api/lists`,
        listData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating list:", error);
      throw error;
    }
  }
);

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLists.fulfilled, (state, action) => {
      state.user_lists = action.payload; // Update the state with the fetched lists
    });
  },
});

export default listSlice.reducer;
