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
import AddList from "../component/addList";
import { addToList, fetchLists } from "../features/listsSlice";
import { FlatList } from "react-native-gesture-handler";
import ItemsListCard from "../component/itemsListCard";

export default function ViewList({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [optionsModal, setOptionsModal] = useState(false);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const navigation = useNavigation();
  const { _id } = route.params;
  const { user_lists } = useSelector((store) => store.list);
  const itemIndex = findIndexById(user_lists, _id);
  let creationDate = new Date(user_lists[itemIndex].timestamp);
  const dispatch = useDispatch();

  const handleAddToList = async () => {
    const newItem = [
      _id,
      {
        name: name,
        quantity: quantity,
        price: price,
        totalPrice: quantity * price,
      },
    ];
    dispatch(addToList(newItem));
    dispatch(fetchLists());
    setModalVisible(false);
    setName(null); // Clear the input field after creating the list
    setQuantity(null); // Clear the input field after creating the list
    setPrice(null); // Clear the input field after creating the list
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
      <View style={formCSS.section}>
        <View style={{ flexDirection: "row", marginBottom: 10 }}>
          <View
            style={{
              width: "30%",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
          >
            <Text style={{ fontWeight: 700, color: "gray" }}>Name</Text>
          </View>
          <View
            style={{
              width: "15%",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
          >
            <Text style={{ fontWeight: 700, color: "gray" }}>Qty</Text>
          </View>
          <View
            style={{
              width: "25%",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
          >
            <Text style={{ fontWeight: 700, color: "gray" }}>Price</Text>
          </View>
          <View
            style={{
              width: "20%",
              borderBottomWidth: 1,
              borderBottomColor: "black",
            }}
          >
            <Text style={{ fontWeight: 700, color: "gray" }}>Amount</Text>
          </View>
        </View>
        {user_lists[itemIndex].items.length === 0 ? (
          <Text>You have no items.</Text>
        ) : (
          <FlatList
            data={user_lists[itemIndex].items}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <ItemsListCard item={item} />}
          />
        )}
      </View>
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
              placeholder={"How many " + name}
              value={quantity}
              onChangeText={(text) => setQuantity(text)}
            />
            <TextInput
              style={formCSS.input}
              placeholder="Enter item price"
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <TouchableOpacity
              style={formCSS.button}
              onPress={name && quantity && price ? handleAddToList : null}
            >
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
  },
  input: {
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
