import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Headline = ({ style, text }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.header}>{text}</Text>
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
