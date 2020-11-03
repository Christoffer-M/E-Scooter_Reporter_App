import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Headline from "../components/Headline";
import CategoryButton from "../components/CategoryButton";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import Buttons from "../components/Button";

const CategoryScreen = ({ navigation }) => {
  const [buttonVisible, setButtonVisibility] = useState(false);
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  const showButton = async () => {
    const keys = await AsyncStorage.getAllKeys();
    if (keys.length === 0) {
      setButtonVisibility(false);
      console.log("is empty");
    } else {
      const result = await AsyncStorage.multiGet(keys);
      setButtonVisibility(true);
    }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Headline text="What is wrong?" flex={{ flex: 0.2 }} />
      <Text style={styles.description} onPress={() => showButton()}>
        Please choose one ossr more categories that fits the violation you wish
        to report
      </Text>
      <View style={styles.buttons}>
        <CategoryButton text="Misplaced" id="0" />
        <CategoryButton text="Laying Down" id="1" />
        <CategoryButton text="Broken" id="2" />
        <CategoryButton text="Other" id="3" />
      </View>
      <Text style={styles.description}>Please Describe</Text>
      <TextInput
        style={{
          width: 250,
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          backgroundColor: "#fff",
        }}
        placeholder="Type here"
      />
      {buttonVisible === true ? (
        <Buttons
          nav={navigation}
          navDir="Report"
          color="orange"
          text="Proceed"
        />
      ) : (
        <View />
      )}

      <Text style={styles.infoText}>* Select one or more options</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    backgroundColor: "#2F4357",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  description: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
  },
  infoText: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
    flex: 0.3,
  },
  buttons: {
    paddingTop: 20,
    flex: 1,
  },
  orangeButton: {
    display: "flex",
    borderRadius: 90,
    width: 250,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CategoryScreen;
