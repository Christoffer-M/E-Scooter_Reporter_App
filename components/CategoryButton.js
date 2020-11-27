import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import * as globals from "./Global";

const CategoryButton = (props) => {
  const [isClicked, SetIsClicked] = useState(false);
  const [currentButtonColor, setColor] = useState("#E77F64");
  const [fontColor, setFontColor] = useState("#fff");
  const [firstRun, setFirstRun] = useState(false);
  const [text, setText] = useState(props.text);

  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  useEffect(() => {
    if (!firstRun) {
      console.log("Running: " + text + " first time");
      const categoryArray = globals.report.getCategories();
      if (categoryArray.length > 0) {
        categoryArray.forEach((element) => {
          if (element === props.text) {
            setColor("#EBC2AD");
            setFontColor("#2F4357");
            SetIsClicked(true);
          }
        });
      }
      setFirstRun(true);
    }
  }, []);

  function changeBackground() {
    if (!isClicked) {
      setColor("#EBC2AD");
      setFontColor("#2F4357");
      SetIsClicked(true);
      switch (props.text) {
        case "Misplaced":
          globals.report.toggleMisplaced();
          setText(props.text + "  🛴 ");
          break;
        case "Laying Down":
          globals.report.toggleLaying();
          setText(props.text + "  🛴 ");
          break;
        case "Broken":
          globals.report.toggleBroken();
          setText(props.text + "  🛴 ");

          break;
        case "Other":
          globals.report.toggleOther();
          props.setOther(true);
          setText(props.text + "  🛴 ");
          break;
      }
    } else {
      setColor("#E77F64");
      setFontColor("#fff");
      SetIsClicked(false);
      switch (props.text) {
        case "Misplaced":
          globals.report.toggleMisplaced();
          setText(props.text);
          break;
        case "Laying Down":
          globals.report.toggleLaying();
          setText(props.text);
          break;
        case "Broken":
          globals.report.toggleBroken();
          setText(props.text);
          break;
        case "Other":
          globals.report.toggleOther();
          setText(props.text);
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
        <Text style={[styles.font, { color: fontColor }]}>{text}</Text>
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
