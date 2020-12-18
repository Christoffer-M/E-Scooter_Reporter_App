import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import Button from "../components/Button";
import Headline from "../components/Headline";
import { AppLoading } from "expo";
import * as globals from "../components/Global.js";
import * as firebaseDataBase from "../data_model/Firebase";
import * as firebase from "firebase/app";
import { useFocusEffect } from "@react-navigation/native";

const WelcomeScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  useFocusEffect(
    React.useCallback(() => {
      firebase.auth().onAuthStateChanged((res) => {
        if (res) {
          globals.setGues(false);
          navigation.push("Home");
        }
      });
    })
  );

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={{ marginRight: 15, marginLeft: 15 }}>
        <Headline text="Welcome!" />
        <Text style={styles.fontStyle}>
          Would you like to sign up or continue as a guest?
        </Text>
        <TouchableOpacity
          onPress={async () => {
            const result = await firebaseDataBase.signInWithGoogleAsync();
            if (result.type === "success") {
              globals.setGues(false);
              navigation.push("Home");
            } else {
              console.log("something went wrong!!!!");
            }
          }}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../assets/Icons/btn_google_signin.png")}
            style={{
              height: 70,
              width: 300,
              borderRadius: 90,
            }}
          />
        </TouchableOpacity>

        <Text style={styles.fontStyleforOr}>or</Text>
        <View style={styles.buttonview}>
          <Button nav={navigation} navDir="Home" text="Guest" color="orange" />
        </View>

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
    paddingBottom: 30,
  },

  fontStyleforOr: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },

  container: {
    flex: 1,
    backgroundColor: "#2F4357",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {},
});

export default WelcomeScreen;
