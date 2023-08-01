import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/signupSlice";

export default function Signup() {
  const dispatch = useDispatch();
  const { userAdded } = useSelector((store) => store.signUp);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleSubmit = () => {
    dispatch(addUser(formData));
  };

  const handlePopupOk = () => {
    if (userAdded === 201) {
      setFormData({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone: "",
      });
    }
  };

  return (
    <ImageBackground
      source={require("../assets/img/Shifty.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.panel}>
          <Text style={styles.heading}>Sign up</Text>
          <Text style={styles.subheading}>
            Start creating your shopping lists effortlessly! Let's get started
            🛍️
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Surname"
            value={formData.surname}
            onChangeText={(text) => setFormData({ ...formData, surname: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                !formData.name ||
                !formData.surname ||
                !formData.email ||
                !formData.password ||
                !formData.phone
              ) {
                Alert.alert("Please fill in all fields.");
              } else {
                handleSubmit();
              }
            }}
            disabled={
              userAdded === 201 || userAdded === 400 || userAdded === 500
            }
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {userAdded === 201 && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>Successful!</Text>
          <TouchableOpacity style={styles.popupButton} onPress={handlePopupOk}>
            <Text style={styles.popupButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
      {userAdded === 400 && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>User already exists.</Text>
          <TouchableOpacity style={styles.popupButton} onPress={handlePopupOk}>
            <Text style={styles.popupButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
      {userAdded === 500 && (
        <View style={styles.popup}>
          <Text style={styles.popupText}>
            Sorry, an error occurred. Please try again.
          </Text>
          <TouchableOpacity style={styles.popupButton} onPress={handlePopupOk}>
            <Text style={styles.popupButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  panel: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#878d5d",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  popup: {
    position: "absolute",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -100 }],
  },
  popupText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  popupButton: {
    backgroundColor: "#878d5d",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  popupButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
