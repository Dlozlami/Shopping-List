import {
  ImageBackground,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../features/signupSlice";
import MessageBox from "../component/messageBox";
import formCSS from "../assets/css/formCSS";
import { Ionicons } from "@expo/vector-icons";

export default function Signup() {
  const [modalVisible, setModalVisible] = useState(false);
  const [enableBTN, setEnableBTN] = useState(false);
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
    setEnableBTN(true);
    dispatch(addUser(formData));
    setFormData({
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
    });
    setEnableBTN(false);
    setModalVisible(true);
  };

  return (
    <ImageBackground
      source={require("../assets/img/Shifty.jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={formCSS.container}>
        <View style={formCSS.panel}>
          <Text style={formCSS.heading}>Sign up</Text>
          <Text style={formCSS.subheading}>
            Start creating your shopping lists effortlessly! Let's get started
            🛍️
          </Text>
          <TextInput
            style={formCSS.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={formCSS.input}
            placeholder="Surname"
            value={formData.surname}
            onChangeText={(text) => setFormData({ ...formData, surname: text })}
          />
          <TextInput
            style={formCSS.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
          <TextInput
            style={formCSS.input}
            placeholder="Password"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) =>
              setFormData({ ...formData, password: text })
            }
          />
          <TextInput
            style={formCSS.input}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => setFormData({ ...formData, phone: text })}
          />
          <TouchableOpacity
            style={formCSS.button}
            onPress={() => {
              if (
                !formData.name ||
                !formData.surname ||
                !formData.email ||
                !formData.password ||
                !formData.phone
              ) {
                setModalVisible(true);
                console.log(userAdded);
              } else {
                handleSubmit();
              }
            }}
            disabled={enableBTN}
          >
            <Text style={formCSS.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      {userAdded === 0 && modalVisible ? (
        <MessageBox
          message={"Please fill in all fields."}
          textColor={"#333"}
          btnColor={"#878d5d"}
          btnTextColor={"white"}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
      {userAdded === 500 && modalVisible ? (
        <MessageBox
          message={"Sorry, an error occurred. Please try again."}
          textColor={"#333"}
          btnColor={"#878d5d"}
          btnTextColor={"white"}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
      {userAdded === 201 && modalVisible ? (
        <MessageBox
          message={"User added successfully!"}
          textColor={"#333"}
          btnColor={"#878d5d"}
          btnTextColor={"white"}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
      {userAdded === 400 && modalVisible ? (
        <MessageBox
          message={"User already exists."}
          textColor={"#333"}
          btnColor={"#878d5d"}
          btnTextColor={"white"}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      ) : null}
    </ImageBackground>
  );
}
