import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IP } from "@env";
import jwt_decode from "jwt-decode";

const initialState = {
  user_lists: [], // Updated key name to 'lists' to represent a list of lists.
};

// Thunk to get data from an endpoint
export const fetchLists = createAsyncThunk(
  "list/fetchLists",
  async (_, thunkAPI) => {
    try {
      const jwt = await SecureStore.getItemAsync("jwt");
      const decodedToken = jwt_decode(jwt);
      let user_email = decodedToken["email"];
      const response = await axios.post(`http://${IP}:8080/api/mylists`, {
        user_email: user_email,
      });
      //console.log("jwt: ", response);
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

export const addToList = createAsyncThunk(
  "list/addToList",
  async (listData, thunkAPI) => {
    console.log("ListData", listData);
    try {
      const response = await axios.patch(
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

export const deleteList = createAsyncThunk(
  "list/deleteList",
  async (listId, thunkAPI) => {
    try {
      // Send the _id of the list to be deleted
      const response = await axios.delete(`http://${IP}:8080/api/lists`, {
        data: { _id: listId },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting list:", error);
      throw error;
    }
  }
);

export const updateListName = createAsyncThunk(
  "list/updateListName",
  async ({ listId, list_name }, thunkAPI) => {
    console.log("The id: ", listId);
    try {
      const response = await axios.patch(`http://${IP}:8080/api/list/names`, {
        _id: listId,
        list_name: list_name,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating list name:", error);
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
