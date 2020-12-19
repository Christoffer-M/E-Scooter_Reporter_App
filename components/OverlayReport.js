import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const OverlayReport = () => {
  return (
    <TouchableHighlight
      style={styles.highlightContainer}
      activeOpacity={1}
      underlayColor="#E77F64"
      onPress={() => {
        console.log("YOU PRESSED ME!");
      }}
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/brand_logos/logo_unknown.png")}
            resizeMode="cover"
            style={{
              height: 55,
              width: 55,
              borderRadius: 8,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={1}>
            Friday, 20 November 2020
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            IT University of Copenhagen
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  highlightContainer: {
    alignSelf: "stretch",
  },
  imageContainer: { padding: 5 },

  container: {
    flexDirection: "row",
  },

  textContainer: {
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    width: 220,
  },

  text: {
    fontFamily: "RobotoMono_500Medium",
    color: "#fff",
    overflow: "hidden",
  },
});
export default OverlayReport;
