import React from "react";
import { View, Text } from "react-native";

const CameraText = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.color,
        paddingLeft: 20,
        paddingRight: 20,
        height: 50,
        borderRadius: 5,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontFamily: "RobotoMono_500Medium",
          fontSize: 16,
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default CameraText;
