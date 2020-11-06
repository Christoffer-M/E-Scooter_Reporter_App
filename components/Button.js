import React from "react";
import { TouchableOpacity, StyleSheet, View, Text } from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import * as firebase from "../data_model/Firebase";

const Button = (props) => {
  
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (props.resetStorage) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => {
              props.resetStorage();
              props.nav.push(props.navDir);
            }}
          >
            <Text style={styles.whiteFont}>{props.text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (props.color === "orange") {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.orangeButton}
            onPress={() => props.nav.push(props.navDir, {class: firebase.newReport("default")})}
          >
            <Text style={styles.whiteFont}>{props.text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else if (props.color === "grey") {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.greyButton}
            onPress={() => props.nav.push(props.navDir)}
          >
            <Text style={styles.greyFont}>{props.text}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  orangeButton: {
    borderRadius: 90,
    backgroundColor: "#E77F64",
    width: 200,
    height: 48,
    alignItems: "center",
    padding: 8,
  },

  greyButton: {
    borderRadius: 90,
    backgroundColor: "#FFFFFF",
    width: 200,
    height: 48,
    alignItems: "center",
    padding: 8,
  },

  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },

  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
  },

  whiteFont: {
    fontFamily: "RobotoMono_500Medium",
    fontSize: 24,
    color: "#fff",
  },

  greyFont: {
    fontFamily: "RobotoMono_500Medium",
    fontSize: 24,
    color: "#2F4357",
  },
});

export default Button;
