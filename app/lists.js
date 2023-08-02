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
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import MessageBox from "../component/messageBox";
import formCSS from "../assets/css/formCSS";

import { getCredentials } from "../features/loginSlice";
import AddList from "../component/addList";
import { createList } from "../features/listsSlice";

export default function Lists() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const dispatch = useDispatch();

  const handleCreateList = () => {
    let list_name = newListName;
    let user_email = dispatch(getCredentials("email")); // Assuming you have a getCredentials selector that returns the email
    const newList = {
      list_name: list_name,
      user_email: user_email,
    };
    dispatch(createList(newList));
    setModalVisible(false);
    setNewListName(""); // Clear the input field after creating the list
  };

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
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={formCSS.heading}>Create a new list</Text>
            <TextInput
              style={formCSS.input}
              placeholder="Enter list name"
              value={newListName}
              onChangeText={(text) => setNewListName(text)}
            />
            <TouchableOpacity style={formCSS.button} onPress={handleCreateList}>
              <Text style={formCSS.buttonText}>Create List</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
