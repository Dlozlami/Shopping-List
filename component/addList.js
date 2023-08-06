import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

export default function AddList({
  size = 28,
  bgColor = "black",
  textColor = "white",
  setModalVisible,
}) {
  return (
    <TouchableOpacity
      style={{ ...styles.circle, backgroundColor: bgColor }}
      onPress={() => setModalVisible(true)}
    >
      <FontAwesome5 name="plus" size={size} color={textColor} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 7,
    margin: 10,

    position: "absolute",
    bottom: 0,
    right: 0,
    zIndex: 9999,
    padding: 10,
    borderRadius: 100,
  },
});
