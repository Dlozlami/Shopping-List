import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function Page() {
  return (
    <ImageBackground
      source={require("../assets/img/Shifty.jpg")}
      style={{ width: "100%", height: "100%" }}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({});
