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
import {
  addToList,
  fetchLists,
  deleteList,
  updateListName,
} from "../features/listsSlice";
import { FlatList } from "react-native-gesture-handler";
import ItemsListCard from "../component/itemsListCard";
import { Ionicons } from "@expo/vector-icons";

export default function ViewList({ route }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [listOptionsModal, setListOptionsModal] = useState(false);
  const [listName, setListName] = useState(null);
  const [name, setName] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [price, setPrice] = useState(null);
  const navigation = useNavigation();
  const { _id } = route.params;
  const { user_lists } = useSelector((store) => store.list);
  const itemIndex = findIndexById(user_lists, _id);
  let creationDate = new Date(user_lists && user_lists[itemIndex].timestamp);
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

  const handleDeleteList = async () => {
    dispatch(deleteList(_id));
    dispatch(fetchLists());
    setListOptionsModal(false);
    navigation.navigate("lists");
  };

  const handleUpdateName = async () => {
    dispatch(
      updateListName({
        listId: _id,
        list_name: listName,
      })
    );
    dispatch(fetchLists());
    setListOptionsModal(false);
    setListName(null);
  };

  return (
    <>
      <ImageBackground
        source={require("../assets/img/Shifty.jpg")}
        style={{
          ...formCSS.panel,
          ...formCSS.shadow,
          flexDirection: "row",
          justifyContent: "space-between",
          color: "white",
        }}
      >
        <View>
          <Text style={{ ...formCSS.title, color: "white" }}>
            {user_lists[itemIndex].list_name}
          </Text>
          <Text style={{ color: "white" }}>
            {user_lists[itemIndex].items.length}{" "}
            {user_lists[itemIndex].items.length === 1 ? "item" : "items"}
          </Text>
        </View>
        <View>
          <View style={{ marginBottom: 15 }}>
            <Text style={formCSS.labels}>DATE CREATED</Text>
            {creationDate.getDate() < 9 ? (
              <Text style={{ color: "white" }}>
                0{creationDate.getDate()}{" "}
                {creationDate.toDateString().split(" ")[1]}
              </Text>
            ) : (
              <Text style={{ color: "white" }}>
                {creationDate.getDate()}{" "}
                {creationDate.toDateString().split(" ")[1]}
              </Text>
            )}
            <Text style={{ color: "white" }}>{creationDate.getFullYear()}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setListOptionsModal(true)}>
              <Ionicons name="options" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={{ ...formCSS.section, ...formCSS.shadow }}>
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
            renderItem={({ item }) => (
              <ItemsListCard item={item} listId={_id} />
            )}
          />
        )}
      </View>
      <View style={{ ...formCSS.section, ...formCSS.shadow }}>
        <View
          style={{
            borderTop: "1px black solid",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ ...formCSS.title, color: "#6c6d61" }}>TOTAL</Text>
          <Text style={{ ...formCSS.title, color: "#6c6d61" }}>
            R {user_lists[itemIndex].total}
          </Text>
        </View>
      </View>
      <AddList bgColor="#7D805E" setModalVisible={setModalVisible} />

      {/* MODAL ============================== Add to a list */}
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
            <TouchableOpacity
              style={formCSS.inverseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={formCSS.inverseButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL ============================== List options */}
      <Modal visible={listOptionsModal} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={{ ...formCSS.heading, marginBottom: 30 }}>
              List Options
            </Text>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: "#6c6d61",
                marginBottom: 20,
              }}
            >
              <TouchableOpacity
                style={{ ...formCSS.button, backgroundColor: "#AF1B3F" }}
                onPress={handleDeleteList}
              >
                <Text style={{ ...formCSS.buttonText, color: "white" }}>
                  <Ionicons name="trash-outline" size={24} color="white" />
                  Delete List
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={formCSS.inverseButtonText}>Edit list name</Text>
              <TextInput
                style={formCSS.input}
                placeholder={user_lists[itemIndex].list_name}
                value={listName}
                onChangeText={(text) => setListName(text)}
              />
              <TouchableOpacity
                style={formCSS.button}
                onPress={handleUpdateName}
              >
                <Text style={formCSS.buttonText}>Change name</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={formCSS.inverseButton}
                onPress={() => setListOptionsModal(false)}
              >
                <Text style={formCSS.inverseButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
