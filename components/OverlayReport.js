import React from "react";
import { Text, StyleSheet, View, Image, Dimensions } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";

const OverlayReport = ({ report }) => {
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
            source={{ uri: report.imageURL }}
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
            {report.getReadableTimestamp()}
          </Text>
          <Text style={styles.text} numberOfLines={1}>
            {report.getReadableAddress()}
          </Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  highlightContainer: {
    alignSelf: "stretch",
    paddingTop: 5,
  },
  imageContainer: { padding: 5 },

  container: {
    flexDirection: "row",
  },

  textContainer: {
    padding: 5,
    flexDirection: "column",
    justifyContent: "space-between",
    width: Dimensions.get("window").width * 0.65,
  },

  text: {
    fontFamily: "RobotoMono_500Medium",
    color: "#fff",
    overflow: "hidden",
  },
});
export default OverlayReport;
