import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import Button from "../components/Button";
import Headline from "../components/Headline";
import BackButton from "../components/BackButton";
import { AppLoading } from "expo";

const SuccessScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <BackButton nav={navigation}></BackButton>
      <View style={{ marginRight: 15, marginLeft: 15 }}>
        <Headline text="Success!" />
        <Text style={styles.fontStyle}>
          Thank you for helping out your city and your e-scooter pals!
        </Text>
        <Button nav={navigation} navDir="Home" text="Done" color="orange" />
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#2F4357",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SuccessScreen;
