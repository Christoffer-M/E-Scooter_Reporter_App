import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import * as globals from "./Global";

const CategoryButton = (props) => {
  const [isClicked, SetIsClicked] = useState(false);
  const [currentButtonColor, setColor] = useState("#E77F64");
  const [fontColor, setFontColor] = useState("#fff");

  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  function changeBackground() {
    if (!isClicked) {
      setColor("#EBC2AD");
      setFontColor("#2F4357");
      SetIsClicked(true);
      switch (props.text) {
        case "Misplaced":
          globals.report.toggleMisplaced();
          break;
        case "Laying Down":
          globals.report.toggleLaying();
          break;
        case "Broken":
          globals.report.toggleBroken();
          break;
        case "Other":
          globals.report.toggleOther();
          props.setOther(true);
          break;
      }
    } else {
      setColor("#E77F64");
      setFontColor("#fff");
      SetIsClicked(false);
      switch (props.text) {
        case "Misplaced":
          globals.report.toggleMisplaced();
          break;
        case "Laying Down":
          globals.report.toggleLaying();
          break;
        case "Broken":
          globals.report.toggleBroken();
          break;
        case "Other":
          globals.report.toggleOther();
          props.setOther(false);
          break;
      }
    }
  }

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.orangeButton, { backgroundColor: currentButtonColor }]}
        onPress={() => changeBackground()}
      >
        <Text style={[styles.font, { color: fontColor }]}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  orangeButton: {
    display: "flex",
    borderRadius: 90,
    width: 250,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingBottom: 20,
  },
  font: {
    fontFamily: "RobotoMono_500Medium",
    fontSize: 22,
  },
});
export default CategoryButton;
