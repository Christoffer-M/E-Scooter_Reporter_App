import React, { useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import AppLoading from "expo-app-loading";
import * as storage from "../data_model/Storage";
import * as globals from "./Global";

const CustomButton = ({ onPress, text, style, textStyle }) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.orangeButton, style]}
          onPress={onPress}
        >
          <Text style={[styles.whiteFont, textStyle]}>{text}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orangeButton: {
    borderRadius: 90,
    backgroundColor: "#E77F64",
    width: 200,
    height: 48,
    alignItems: "center",
    padding: 8,
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },

  whiteFont: {
    fontFamily: "RobotoMono_500Medium",
    fontSize: 24,
    color: "#fff",
  },
});

export default CustomButton;
