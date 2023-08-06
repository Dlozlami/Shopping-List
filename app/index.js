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
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { loginUser, logoutUser } from "../features/loginSlice";

export default function Login() {
  const { isLoggedIn } = useSelector((store) => store.logIn);
  if (isLoggedIn > 0) {
    async () => {
      const jwt = await SecureStore.getItemAsync("jwt");
      const decodedToken = jwt_decode(jwt);
      setClientName(decodedToken["name"]);
    };
  }
  const navigation = useNavigation();
  const [enableBTN, setEnableBTN] = useState(false);
  const [clientName, setClientName] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogIn = () => {
    setEnableBTN(true);
    dispatch(loginUser(formData));
    //console.log("client", isLoggedIn);
    setFormData({
      email: "",
      password: "",
    });
    setEnableBTN(false);
    if (isLoggedIn > 0) {
      console.log("isLoggedIn > 0");
      async () => {
        const jwt = await SecureStore.getItemAsync("jwt");
        const decodedToken = jwt_decode(jwt);
        setClientName(decodedToken["name"]);
      };
    }
  };

  const handleLogOut = () => {
    setEnableBTN(true);
    dispatch(logoutUser());
    //console.log("handleLogOut", isLoggedIn);
    setEnableBTN(false);
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

            <TouchableOpacity onPress={() => navigation.navigate("lists")}>
              <Text style={formCSS.subheading}>
                Proceed to your shopping lists 🛍️
              </Text>
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
            <Text style={formCSS.subheading}>
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
              onPress={() => handleLogIn()}
              disabled={enableBTN}
            >
              <Text style={formCSS.buttonText}>log in</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("signup")}>
              <Text style={formCSS.subheading}>
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
