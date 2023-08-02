import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IP } from "@env";

const initialState = {};

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
});

export default listSlice.reducer;
