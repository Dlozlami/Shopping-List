import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function ItemsListCard({ item }) {
  return (
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
      <TouchableOpacity style={{ alignItems: "center" }}>
        <Ionicons name="options" size={24} color="#7D805E" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
