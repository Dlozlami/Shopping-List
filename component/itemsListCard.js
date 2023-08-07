import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import formCSS from "../assets/css/formCSS";
import {
  fetchLists,
  deleteAnItem,
  updateListItem,
} from "../features/listsSlice";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

export default function ItemsListCard({ item, listId }) {
  const [itemOptionsModal, setItemOptionsModal] = useState(false);
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [price, setPrice] = useState(item.price);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleDeleteItem = async () => {
    dispatch(
      deleteAnItem({
        listId: listId,
        itemId: item._id,
      })
    );
    dispatch(fetchLists());
    setItemOptionsModal(false);
    navigation.navigate("lists");
  };

  const handleupdateListItem = async () => {
    const newItem = {
      listId: listId,
      itemId: item._id,
      name: name,
      quantity: quantity,
      price: price,
      totalPrice: quantity * price,
    };
    dispatch(updateListItem(newItem));
    dispatch(fetchLists());
    setItemOptionsModal(false);
    setName(null); // Clear the input field after creating the list
    setQuantity(null); // Clear the input field after creating the list
    setPrice(null); // Clear the input field after creating the list
  };

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        <View style={{ width: "30%", justifyContent: "center" }}>
          <Text>{item.name}</Text>
        </View>
        <View style={{ width: "15%", justifyContent: "center" }}>
          <Text>{item.quantity}</Text>
        </View>
        <View style={{ width: "25%", justifyContent: "center" }}>
          <Text>{parseFloat(item.price).toFixed(2)}</Text>
        </View>
        <View style={{ width: "22%", justifyContent: "center" }}>
          <Text>{parseFloat(item.totalPrice).toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => setItemOptionsModal(true)}
        >
          <Ionicons name="options" size={24} color="#7D805E" />
        </TouchableOpacity>
      </View>
      {/* MODAL ============================== Item options */}
      <Modal visible={itemOptionsModal} transparent={true}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={{ ...formCSS.heading, marginBottom: 30 }}>
              List item Options
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
                onPress={handleDeleteItem}
              >
                <Text style={{ ...formCSS.buttonText, color: "white" }}>
                  <Ionicons name="trash-outline" size={24} color="white" />
                  Delete item
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 20 }}>
              <Text style={{ ...formCSS.inverseButtonText, marginBottom: 10 }}>
                Edit item details
              </Text>
              <TextInput
                style={formCSS.input}
                placeholder={item.name}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <TextInput
                style={formCSS.input}
                placeholder={quantity + ""}
                value={quantity + ""}
                onChangeText={(text) => setQuantity(text)}
              />
              <TextInput
                style={formCSS.input}
                placeholder={price + ""}
                value={price + ""}
                onChangeText={(text) => setPrice(text)}
              />
              <TouchableOpacity
                style={formCSS.button}
                onPress={
                  name && quantity && price ? handleupdateListItem : null
                }
              >
                <Text style={formCSS.buttonText}>Update item</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={formCSS.inverseButton}
                onPress={() => setItemOptionsModal(false)}
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
});
