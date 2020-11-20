import React from "react";
import { View, Text } from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";

const CameraText = (props) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View
      style={{
        backgroundColor: props.color,
        paddingLeft: 20,
        paddingRight: 20,
        height: 32,
        borderRadius: 16,
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          fontFamily: "RobotoMono_500Medium",
          fontSize: 14,
        }}
      >
        {props.text}
      </Text>
    </View>
  );
};

export default CameraText;
