import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import Headline from "../components/Headline";
import * as storage from "../data_model/Storage";
import * as firebaseDataBase from "../data_model/Firebase";
import SvgUri from "expo-svg-uri";
const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginRight: 15, marginLeft: 15 }}>
        <Headline text="Welcome!" />
        <Text style={styles.fontStyle}>
          Would you like to sign in or continue as a guest?
        </Text>
        <TouchableOpacity
          onPress={async () => {
            const result = await firebaseDataBase.signInWithGoogleAsync();
            if (result.type === "success") {
              storage.setUser(result.user.email);
              storage.syncReports();
              storage.setGuest(false);
              navigation.push("Home");
            } else {
              console.log("something went wrong!!!!");
            }
          }}
          style={{
            flexDirection: "row",
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 90,
            backgroundColor: "#E77F64",
            width: 200,
            height: 48,
            padding: 8,
            textAlign: "center",
          }}
        >
          <SvgUri
            source={require("../assets/brand_logos/logo_google.svg")}
            width="35"
            height="35"
            style={{ paddingLeft: 0, alignSelf: "flex-start" }}
          />
          <Text
            style={{
              fontFamily: "RobotoMono_500Medium",
              fontSize: 16,
              color: "#fff",
              paddingLeft: 10,
            }}
          >
            Google Sign In
          </Text>
        </TouchableOpacity>

        <Text style={styles.fontStyleforOr}>or</Text>
        <View style={styles.buttonview}>
          <CustomButton
            onPress={() => {
              console.log("setting guest to true");
              storage.setGuest(true);
              navigation.push("Home");
              storage.syncReports();
            }}
            text="Guest"
            style={{ justifyContent: "center" }}
            textStyle={{ fontSize: 18 }}
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
