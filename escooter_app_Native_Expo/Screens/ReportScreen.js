import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import Headline from "../components/Headline.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../components/Button.js";

var allcategories = [];
fillcategories();

const ReportScreen = ({ navigation }) => {
  const [categoryArray, setArray] = useState(allcategories);

  useEffect(() => {
    if (allcategories.length !== categoryArray.length) {
      setArray(allcategories);
    }
  });

  const resetStorage = () => {
    AsyncStorage.clear();
  };

  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Headline text="Your report" flex={{ flex: 0.2 }} />
      <Text style={styles.infoText}>Violations</Text>

      <View style={styles.categoriesContainer}>
        {allcategories.map((item, key) => {
          return <Button text={item} color="orange" key={key} />;
        })}
      </View>
      <Button
        text="Submit"
        color="orange"
        nav={navigation}
        navDir="Success"
        resetStorage={resetStorage}
      />
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
  infoText: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
    flex: 0.3,
  },
  categoriesContainer: {
    flex: 1,
  },
});

async function fillcategories() {
  const keys = await AsyncStorage.getAllKeys();

  if (keys.length !== 0) {
    const categories = await AsyncStorage.multiGet(keys);

    categories.map((result, i, store) => {
      const val = store[i][1];
      if (!allcategories.includes(val)) {
        allcategories.push(val);
      }
    });
  }
}

export default ReportScreen;
