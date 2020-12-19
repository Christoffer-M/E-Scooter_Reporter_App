import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import Headline from "../components/Headline";
import * as globals from "../components/Global.js";
import * as firebaseDataBase from "../data_model/Firebase";
const WelcomeScreen = ({ navigation }) => {
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
          <CustomButton
            onPress={() => {
              console.log("setting guest to true");
              globals.setGues(true);
              navigation.push("Home");
            }}
            text="Guest"
          />
        </View>
        {/* <View style={styles.buttonview}>
          <Button
            onPress={onPressLearnMore}
            title="TESTING"
            color="#841584"
            accessibilityLabel=""
          />
        </View> */}
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
