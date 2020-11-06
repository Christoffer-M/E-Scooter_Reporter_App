import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Headline from "../components/Headline";
import CategoryButton from "../components/CategoryButton";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import Buttons from "../components/Button";

const CategoryScreen = ({ navigation }) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Headline text="What is wrong?" flex={{ flex: 0.1 }} />
      <Text style={styles.description}>
        Please choose one or more categories that fits the violation you wish to
        report
      </Text>
      <View style={styles.buttons}>
        <CategoryButton text="Misplaced" id="0" />
        <CategoryButton text="Laying Down" id="1" />
        <CategoryButton text="Broken" id="2" />
        <CategoryButton text="Other" id="3" />
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
      </View>
      <Buttons nav={navigation} navDir="Report" color="orange" text="Proceed" />
      <Text style={styles.infoText}>* Select one or more options</Text>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#2F4357",
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    flex: 1,
    backgroundColor: "#2F4357",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
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
    paddingBottom: 15,
  },
  buttons: {
    paddingTop: 20,
    flex: 1,
  },
});

export default CategoryScreen;
