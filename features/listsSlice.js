import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IP } from "@env";

const initialState = {};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {},
});

export default listSlice.reducer;
