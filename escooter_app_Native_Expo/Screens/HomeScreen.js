const { exp } = require("react-native-reanimated");

import React, {useState} from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";

const HomeScreen = () => {




  return (
    <View style={styles.container}>
      <MapView 
        style={styles.mapStyle} 
        zoomEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default HomeScreen;
