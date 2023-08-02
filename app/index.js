import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import MessageBox from "../component/messageBox";
import formCSS from "../assets/css/formCSS";

export default function Page() {
  return (
    <ImageBackground
      source={require("../assets/img/Shifty.jpg")}
      style={{ width: "100%", height: "100%" }}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({});
