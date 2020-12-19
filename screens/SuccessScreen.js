import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import Headline from "../components/Headline";
import BackButton from "../components/BackButton";

const SuccessScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackButton nav={navigation}></BackButton>
      <View style={{ marginRight: 15, marginLeft: 15 }}>
        <Headline text="Success!" />
        <Text style={styles.fontStyle}>
          Thank you for helping out your city and your e-scooter pals!
        </Text>
        <CustomButton
          onPress={() => {
            navigation.push("Home");
          }}
          text="Done"
          color="orange"
        />
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
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#2F4357",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SuccessScreen;
