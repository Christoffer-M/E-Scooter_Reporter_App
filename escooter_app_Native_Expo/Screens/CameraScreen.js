import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Camera } from "expo-camera";
import SvgUri from "expo-svg-uri";

const CameraSceen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function goBack() {
    navigation.goBack();
  }

  if (hasPermission === null) {
    return (
      <View style={[styles.loading]}>
        <ActivityIndicator size="large" color="#E77F64" />
      </View>
    );
  }

  if (hasPermission === false) {
    goBack({ navigation });
    alert("No access to Camera");
    return (
      <View style={[styles.loading]}>
        <ActivityIndicator size="large" color="#E77F64" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "column",
            paddingTop: 50,
          }}
        >
          <View
            style={{
              flex: 1,
              alignSelf: "center",
              alignItems: "center",
              paddingTop: 30,
            }}
          >
            <Text style={{ color: "white" }}>
              Take a picture of the incident
            </Text>
          </View>
          <TouchableOpacity
            style={{
              flex: 0.25,
              alignSelf: "center",
              alignItems: "flex-start",
              paddingBottom: 0,
            }}
          >
            <SvgUri
              width="76"
              height="76"
              source={require("../assets/Icons/take_photo.svg")}
            />
          </TouchableOpacity>
        </View>
      </Camera>
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

  noCamera: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CameraSceen;
