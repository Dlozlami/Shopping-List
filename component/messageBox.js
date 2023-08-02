import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import React from "react";

export default function MessageBox({
  message = "No message",
  boxColor = "white",
  textColor = "black",
  btnColor = "blue",
  btnTextColor = "white",
  setModalVisible,
  modalVisible,
}) {
  console.log("This is form checking");
  return (
    <Modal transparent animationType="fade" visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: boxColor }]}>
          <Text style={[styles.messageText, { color: textColor }]}>
            {message}
          </Text>
          <TouchableOpacity
            style={[styles.okButton, { backgroundColor: btnColor }]}
            onPress={() => setModalVisible(false)}
          >
            <Text style={[styles.okButtonText, { color: btnTextColor }]}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 5,
  },
  messageText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  okButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    minWidth: 100,
    alignItems: "center",
    marginTop: 10,
  },
  okButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
