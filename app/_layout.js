import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./index";
import Signup from "./signup";
import Lists from "./lists";
import ViewList from "./viewList";

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack.Navigator>
        <Stack.Screen
          name="index"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ title: "Log in" }}
        />
        <Stack.Screen
          name="lists"
          component={Lists}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="viewList"
          component={ViewList}
          options={{ title: "Shopping lists" }}
        />
      </Stack.Navigator>
    </Provider>
  );
}
