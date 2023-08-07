import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import MessageBox from "../component/messageBox";
import formCSS from "../assets/css/formCSS";
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { loginUser, logoutUser, refreshLogin } from "../features/loginSlice";

export default function Login() {
  const { isLoggedIn } = useSelector((store) => store.logIn);
  const navigation = useNavigation();
  const [enableBTN, setEnableBTN] = useState(false);
  const [clientName, setClientName] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    dispatch(refreshLogin());
    getClientName();
  }, [isLoggedIn]);

  const handleLogIn = () => {
    setEnableBTN(true);
    dispatch(loginUser(formData));
    console.log("client", isLoggedIn);
    setFormData({
      email: "",
      password: "",
    });
    setEnableBTN(false);
  };

  const handleLogOut = () => {
    setEnableBTN(true);
    dispatch(logoutUser());
    setEnableBTN(false);
  };

  const getClientName = async () => {
    if (isLoggedIn > 0) {
      const jwt = await SecureStore.getItemAsync("jwt");
      const decodedToken = jwt_decode(jwt);
      setClientName(decodedToken["name"]);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/img/Shifty.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      {isLoggedIn === 200 ? (
        <View style={formCSS.container}>
          <View style={formCSS.panel}>
            <Text style={formCSS.heading}>Hello, {clientName}</Text>

            <TouchableOpacity
              style={formCSS.inverseButton}
              onPress={() => navigation.navigate("lists")}
            >
              <Text style={formCSS.inverseButtonText}>Shopping lists 🛍️</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={formCSS.button}
              onPress={() => handleLogOut()}
              disabled={enableBTN}
            >
              <Text style={formCSS.buttonText}>log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={formCSS.container}>
          <View style={formCSS.panel}>
            <Text style={formCSS.heading}>Log in</Text>
            <Text style={formCSS.para}>
              Please log in to access your shopping lists 🛍️
            </Text>
            <TextInput
              style={formCSS.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
            />
            <TextInput
              style={formCSS.input}
              placeholder="Password"
              secureTextEntry={true}
              value={formData.password}
              onChangeText={(text) =>
                setFormData({ ...formData, password: text })
              }
            />
            <TouchableOpacity
              style={formCSS.button}
              onPress={handleLogIn}
              disabled={enableBTN}
            >
              <Text style={formCSS.buttonText}>log in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={formCSS.body}>
                {"\n"}
                Don't have an account? Sign up here!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}
