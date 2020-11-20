import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import SvgUri from "expo-svg-uri";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import * as globals from "./Global";

const BackButton = (props) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.nav.goBack();
        }}
      >
        <SvgUri
          width="30"
          height="30"
          fill="#E77F64"
          source={require("../assets/Icons/arrow-left-solid.svg")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    display: "flex",
    top: 50,
    left: 10,
  },
});

export default BackButton;
