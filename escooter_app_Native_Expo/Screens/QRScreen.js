import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import CameraText from "../components/CameraText";
import { Camera } from "expo-camera";

const QRScreen = ({ navigaton }) => {
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
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        backgroundColor: "pink",
        padding: 0,
      }}
    >
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        ratio="16:9"
        style={StyleSheet.absoluteFill}
      >
        <View
          style={{
            flex: 1,
            alignSelf: "center",
            alignItems: "center",
            paddingTop: 30,
          }}
        >
          <CameraText text="Point camera at the QR-Code" />
        </View>
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </Camera>
    </View>
  );
};

export default QRScreen;
