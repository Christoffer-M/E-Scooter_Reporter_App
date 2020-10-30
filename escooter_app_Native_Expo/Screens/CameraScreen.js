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
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";

const CameraSceen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function goBack() {
    navigation.goBack();
  }

  if (!fontsLoaded) {
    return <AppLoading />;
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
            display: "flex",
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
            <TouchableOpacity
              style={{
                backgroundColor: "#E77F64",
                width: 274,
                height: 32,
                borderRadius: 16,
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontFamily: "RobotoMono_500Medium",
                  fontSize: 14,
                }}
              >
                Take a picture of the incident
              </Text>
            </TouchableOpacity>
          </View>
          <View></View>
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
