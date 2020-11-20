import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import Headline from "../components/Headline";
import BackButton from "../components/BackButton";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <BackButton nav={navigation}></BackButton>
      <View style={{ marginRight: 15, marginLeft: 15 }}>
        <Headline text="Welcome!" style={{ color: "#fff" }} />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "#fff",
          }}
        />
        <TextInput
          style={{
            width: 300,
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            backgroundColor: "#fff",
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            nav={navigation}
            navDir="Login"
            text="Log in"
            color="orange"
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
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

  header: {
    flex: 0.5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default HomeScreen;
