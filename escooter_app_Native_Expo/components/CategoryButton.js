import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";

const CategoryButton = (props) => {
  const [isClicked, SetIsClicked] = useState(false);
  const [currentButtonColor, setColor] = useState("#E77F64");
  const [fontColor, setFontColor] = useState("#fff");

  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  function changeBackground() {
    if (!isClicked) {
      setColor("#fff");
      setFontColor("#2F4357");
      SetIsClicked(true);
      console.log("adding key: " + props.id);
      storeData(props.text);
    } else {
      setColor("#E77F64");
      setFontColor("#fff");
      SetIsClicked(false);
      console.log("removing key: " + props.id);
      AsyncStorage.removeItem(props.id);
    }
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem(props.id, value);
    } catch (e) {
      alert("Something went wrong");
    }
  };

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
