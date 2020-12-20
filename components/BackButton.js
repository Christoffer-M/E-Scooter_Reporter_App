import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import SvgUri from "expo-svg-uri";
import AppLoading from "expo-app-loading";

const BackButton = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          props.nav.goBack();
        }}
      >
        <SvgUri
          width="25"
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
    left: 20,
  },
});

export default BackButton;
