import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const overlayReport = (props) => {
  return (
    <View>
      <TouchableHighlight>
        <Image source={require("../assets/Icons/profile_icon.png")} />

        <Text>{props.date}</Text>
        <Text>{props.address}</Text>
      </TouchableHighlight>
    </View>
  );
};

export default overlayReport;
