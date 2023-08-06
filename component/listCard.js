import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import formCSS from "../assets/css/formCSS";
import { useNavigation } from "@react-navigation/native";

export default function ListCard({ shoppingList }) {
  //console.log(shoppingList);
  const navigation = useNavigation();
  const creationDate = new Date(shoppingList.t);
  return (
    <TouchableOpacity
      style={formCSS.panel}
      onPress={() => navigation.navigate("viewList", { _id: shoppingList._id })}
    >
      <Text>{shoppingList.list_name}</Text>
      <Text>{shoppingList.items.length} items</Text>
    </TouchableOpacity>
  );
}
