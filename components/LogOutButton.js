import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as firebase from "../data_model/Firebase";
import * as storage from "../data_model/Storage";

const LogOutButton = (props) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: "#E77F64",
        width: 150,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
      }}
      onPress={() => {
        props.nav.push("Welcome");
        firebase.logout();
        storage.setUser("guest");
      }}
    >
      <Text>Log out</Text>
    </TouchableOpacity>
  );
};

export default LogOutButton;
