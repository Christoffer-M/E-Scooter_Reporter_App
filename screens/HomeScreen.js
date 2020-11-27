const { exp } = require("react-native-reanimated");

import React, { useEffect, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import Button from "../components/Button";
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgUri from "expo-svg-uri";
import * as firebase from "../data_model/Firebase";

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        navigation.goBack();
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  if (location == null) {
    return (
      <View style={[styles.loading]}>
        <ActivityIndicator size="large" color="#E77F64" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        zoomEnabled={true}
        showsUserLocation={true}
        followsUserLocation={true}
        region={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

      <View style={styles.menuButton}>
        <TouchableOpacity>
          <SvgUri
            width="60"
            height="60"
            source={require("../assets/Icons/profile_icon.svg")}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.reportButton}>
        <Button nav={navigation} navDir="Camera" text="Report" color="orange" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  reportButton: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 35,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  menuButton: {
    position: "absolute",
    top: 0,
    left: 0,
    paddingTop: 40,
    paddingLeft: 25,
    alignItems: "flex-end",
    justifyContent: "flex-start",
  },

  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default HomeScreen;
