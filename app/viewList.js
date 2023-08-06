import { ImageBackground, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import formCSS from "../assets/css/formCSS";

export default function ViewList({ route }) {
  const navigation = useNavigation();
  const { _id } = route.params;
  const { user_lists } = useSelector((store) => store.list);
  const itemIndex = findIndexById(user_lists, _id);
  let creationDate = new Date(user_lists[itemIndex].timestamp);
  return (
    <ImageBackground
      source={require("../assets/img/Shifty.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={formCSS.panel}>
        <View>
          <Text style={formCSS.heading}>{user_lists[itemIndex].list_name}</Text>
          <Text style={formCSS.subheading}>
            {user_lists[itemIndex].items.length} items
          </Text>
        </View>
        <View>
          <Text>{creationDate.getDate()}</Text>
          <Text>{creationDate.getMonth()}</Text>
          <Text>{creationDate.getFullYear()}</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});

function findIndexById(list, id) {
  for (let i = 0; i < list.length; i++) {
    if (list[i]._id === id) {
      return i;
    }
  }
  return -1; // Return -1 if the object with the given id is not found in the list
}
