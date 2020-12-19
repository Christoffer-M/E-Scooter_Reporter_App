import React from "react";
import { Text, StyleSheet, View } from "react-native";

const Headline = (props) => {
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
