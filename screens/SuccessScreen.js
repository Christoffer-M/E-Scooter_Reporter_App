import React from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import Headline from "../components/Headline";
import { useFocusEffect } from "@react-navigation/native";
import { CommonActions } from "@react-navigation/native";

const SuccessScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", resetToHome);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", resetToHome);
      };
    }, [])
  );

  function resetToHome() {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "Home" }],
      })
    );
    return true;
  }
  return (
    <View style={styles.container}>
      <View style={{ marginRight: 15, marginLeft: 15 }}>
        <Headline text="Success!" />
        <Text style={styles.fontStyle}>
          Thank you for helping out your city and your e-scooter pals!
        </Text>
        <CustomButton
          onPress={() => {
            resetToHome();
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
