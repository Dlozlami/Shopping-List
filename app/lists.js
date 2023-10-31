import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as SecureStore from "expo-secure-store";
import MessageBox from "../component/messageBox";
import formCSS from "../assets/css/formCSS";
import jwt_decode from "jwt-decode";
import AddList from "../component/addList";
import { createList, fetchLists } from "../features/listsSlice";
import ListCard from "../component/listCard";
import { useNavigation } from "@react-navigation/native";

export default function Lists() {
  const [reloadScreen, setReloadScreen] = useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [newListName, setNewListName] = useState("");
  const dispatch = useDispatch();
  const { user_lists } = useSelector((store) => store.list);

  const handleCreateList = async () => {
    const jwt = await SecureStore.getItemAsync("jwt");
    const decodedToken = jwt_decode(jwt);
    let list_name = newListName;
    let user_email = decodedToken["email"];
    const newList = {
      list_name: list_name,
      user_email: user_email,
    };
    dispatch(createList(newList));
    setModalVisible(false);
    setReloadScreen(!reloadScreen);
    setNewListName(""); // Clear the input field after creating the list
  };

  useEffect(() => {
    dispatch(fetchLists());
  }, [reloadScreen]);

  return (
    <>
      <ImageBackground
        source={require("../assets/img/Shifty.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <AddList setModalVisible={setModalVisible} />

        {user_lists.length === 0 ? (
          <View style={formCSS.container}>
            <View style={{ ...formCSS.panel, width: "90%" }}>
              <Text style={formCSS.subheading}>
                You have no lists. {"\n"}Click the '+' button to add a list
              </Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={user_lists}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ListCard shoppingList={item} />}
          />
        )}

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
              <TouchableOpacity
                style={formCSS.button}
                onPress={handleCreateList}
              >
                <Text style={formCSS.buttonText}>Create List</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
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
