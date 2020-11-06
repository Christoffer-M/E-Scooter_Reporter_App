import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useFonts, RobotoMono_700Bold } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";

const Headline = (props) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={[styles.container, props.flex]}>
      <Text style={styles.header}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 35,
    fontFamily: "RobotoMono_700Bold",
    color: "#EBC2AD",
  },

  container: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Headline;
