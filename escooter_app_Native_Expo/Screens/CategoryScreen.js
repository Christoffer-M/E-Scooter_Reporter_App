import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Headline from "../components/Headline";
import CategoryButton from "../components/CategoryButton";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";

const CategoryScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Headline text="What is wrong?" flex={{ flex: 0.2 }} />
      <Text style={styles.description}>
        Please choose one or more categories that fits the violation you wish to
        report
      </Text>
      <View style={styles.buttons}>
        <CategoryButton text="Misplaced" />
        <CategoryButton text="Laying Down" />
        <CategoryButton text="Broken" />
        <CategoryButton text="Other" />
      </View>
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
});

export default CategoryScreen;
