import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Dimensions, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import CameraText from "../components/CameraText";
import { Camera } from "expo-camera";
import BackButton from "../components/BackButton";
import Button from "../components/Button";
import * as globals from "../components/Global.js";

const QRScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //Data variable is what needs to be stored in FireBase
  const handleBarCodeScanned = ({ type, data }) => {
    globals.report.setQR(data);
    setScanned(true);
    Alert.alert(
      "Bar code Scanned!",
      "Bar code with type " + type + " and data " + data + " has been scanned!",
      [
        {
          text: "Scan again",
          onPress: () => setScanned(false),
          style: "cancel",
        },
        {
          text: "Continue",
          onPress: () => {
            navigation.push("Category");
          },
        },
      ],
      { cancelable: false }
    );
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio="16:9"
        style={StyleSheet.absoluteFill}
      >
        <BackButton nav={navigation}></BackButton>
        <View style={{ flex: 0.25 }}>
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              alignItems: "center",
              top: Dimensions.get("window").height / 10,
            }}
          >
            <CameraText text="Point camera at the QR-Code" color="#E77F64" />
          </View>
        </View>
        <View style={{ flex: 0.5, flexDirection: "row", display: "flex" }}>
          <View style={{ flex: 0.05 }} />
          <View
            style={{
              flex: 0.9,
              borderStyle: "dashed",
              borderRadius: 15,
              borderWidth: 5,
              borderColor: "#ffff",
            }}
          />
          <View style={{ flex: 0.05 }} />
        </View>
        <View
          style={{
            flex: 0.25,
          }}
        >
          <View
            style={{
              width: 250,
              paddingTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Button
              text="Skip"
              color="orange"
              title={"Continue"}
              nav={navigation}
              navDir="Category"
            />
          </View>
        </View>
      </Camera>
    </View>
  );
};

export default QRScreen;
