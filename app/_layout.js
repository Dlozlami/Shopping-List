import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./index";
import Signup from "./signup";

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
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </Provider>
  );
}
