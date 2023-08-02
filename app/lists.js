import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import MessageBox from "../component/messageBox";
import formCSS from "../assets/css/formCSS";
import jwt_decode from "jwt-decode";
import { useNavigation } from "@react-navigation/native";
import { loginUser, logoutUser } from "../features/loginSlice";
import AddList from "../component/addList";

export default function Lists() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ImageBackground
      source={require("../assets/img/Shifty.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={formCSS.container}>
        <View style={formCSS.panel}>
          <Text style={formCSS.heading}>Shopping lists 🛍️</Text>
        </View>

        <View style={formCSS.panel}>
          <Text style={formCSS.subheading}>
            You have no lists. Click the '+' button to add a list
          </Text>
        </View>
      </View>
      <View style={styles.addList}>
        <AddList />
      </View>
      <Modal></Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  addList: {
    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 9999,
    padding: 10,
    borderRadius: 10,
  },
});
