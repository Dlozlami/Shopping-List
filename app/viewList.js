import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

export default function ViewList({ route }) {
  const navigation = useNavigation();
  const { hello, num } = route.params;
  const { user_lists } = useSelector((store) => store.list);

  return (
    <View>
      <Text>Route params {hello}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
