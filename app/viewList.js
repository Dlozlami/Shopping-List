import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import formCSS from "../assets/css/formCSS";
import Seperator from "../component/seperator";
import AddList from "../component/addList";

export default function ViewList({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const navigation = useNavigation();
  const { _id } = route.params;
  const { user_lists } = useSelector((store) => store.list);
  const itemIndex = findIndexById(user_lists, _id);
  let creationDate = new Date(user_lists[itemIndex].timestamp);

  const handleAddToList = async () => {
    const jwt = await SecureStore.getItemAsync("jwt");
    const decodedToken = jwt_decode(jwt);
    let list_name = newListName;
    let user_email = decodedToken["email"];
    const newItem = {
      name: name,
      quantity: quantity,
      price: price,
      totalPrice: quantity * price,
    };
    dispatch(addToList(newList));
    setModalVisible(false);
    setNewListName(""); // Clear the input field after creating the list
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/img/Shifty.jpg")}
        style={{
          ...formCSS.panel,
          flexDirection: "row",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <View>
          <Text style={{ ...formCSS.heading, color: "white" }}>
            {user_lists[itemIndex].list_name}
          </Text>
          <Text style={{ ...formCSS.subheading, color: "white" }}>
            {user_lists[itemIndex].items.length} items
          </Text>
        </View>
        <View>
          <View style={{ marginBottom: 15 }}>
            <Text style={formCSS.labels}>DATE CREATED</Text>
            {creationDate.getDate() < 9 ? (
              <Text>
                0{creationDate.getDate()}{" "}
                {creationDate.toDateString().split(" ")[1]}
              </Text>
            ) : (
              <Text>
                {creationDate.getDate()}{" "}
                {creationDate.toDateString().split(" ")[1]}
              </Text>
            )}
            <Text>{creationDate.getFullYear()}</Text>
          </View>
          <View>
            <Text style={formCSS.labels}>TOTAL</Text>
            <Text>R {user_lists[itemIndex].total}</Text>
          </View>
        </View>
      </ImageBackground>
      <View style={formCSS.section}></View>
      <View style={formCSS.section}>
        <View
          style={{
            borderTop: "1px black solid",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={formCSS.title}>TOTAL</Text>
          <Text style={formCSS.title}>{user_lists[itemIndex].total}</Text>
        </View>
      </View>
      <AddList bgColor="#7D805E" setModalVisible={setModalVisible} />
      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={formCSS.heading}>Create a new list</Text>
            <TextInput
              style={formCSS.input}
              placeholder="Enter item name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              style={formCSS.input}
              placeholder="Enter item quantity"
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
            <TextInput
              style={formCSS.input}
              placeholder="Enter item price"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <TouchableOpacity style={formCSS.button} onPress={handleAddToList}>
              <Text style={formCSS.buttonText}>Add item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

function findIndexById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i]._id === id) {
      return i;
    }
  }
  return -1; // Return -1 if the object with the given id is not found in the list
}
