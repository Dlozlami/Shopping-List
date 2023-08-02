import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Modal,
  ScrollView,
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
      <ScrollView contentContainerStyle={formCSS.container}>
        <View style={{ ...formCSS.panel, width: "90%" }}>
          <Text style={formCSS.heading}>Shopping lists 🛍️</Text>
        </View>

        <View style={{ ...formCSS.panel, width: "90%" }}>
          <Text style={formCSS.subheading}>
            You have no lists. {"\n"}Click the '+' button to add a list
          </Text>
        </View>
      </ScrollView>
      <View style={styles.addList}>
        <AddList setModalVisible={setModalVisible} />
      </View>
      <Modal visible={modalVisible}></Modal>
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
