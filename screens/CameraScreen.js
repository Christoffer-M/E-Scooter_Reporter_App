import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  ActivityIndicator,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { Permissions } from "expo";
import { Camera } from "expo-camera";
import SvgUri from "expo-svg-uri";
import CameraText from "../components/CameraText";
import * as globals from "../components/Global";
import * as FileSystem from "expo-file-system";
import * as imagehandler from "../data_model/ImageHandler";
import { cos } from "react-native-reanimated";
import Headline from "../components/Headline";

const report = globals.report;

const CameraSceen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [age, setAge] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [imageTaken, setImageTaken] = useState(false);
  const [loadingPicture, setLoading] = useState(false);
  const [pictureURI, setURI] = useState("");

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
        <Text>No access to camera</Text>
      </View>
    );
  }

  return !imageTaken ? (
    <Camera
      ratio="16:9"
      style={StyleSheet.absoluteFill}
      type={type}
      ref={(ref) => {
        setCameraRef(ref);
      }}
    >
      <View
        style={{
          display: "flex",
          flex: 1,
        }}
      >
        <View
          style={{
            width: Dimensions.get("window").width,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 30,
            backgroundColor: "#2F4357",
          }}
        >
          <Headline text="Picture" />
          <CameraText text="Take a picture of the incident" />
        </View>
        {!loadingPicture ? (
          <View
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width,

              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></View>
        ) : (
          <View
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").width,
              backgroundColor: "white",
              opacity: 0.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        )}

        <View
          style={{
            flex: 1,
            width: Dimensions.get("window").width,
            backgroundColor: "#2F4357",
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              paddingBottom: 0,
            }}
            onPress={async () => {
              if (cameraRef) {
                setLoading(true);
                let photo = await cameraRef.takePictureAsync();

                cameraRef.pausePreview();
                setURI(photo.uri);

                //console.log(photo);
                const newimage = await imagehandler.cropImageToSquare(
                  photo.uri,
                  photo.width,
                  photo.height
                );
                //console.log(newimage);
                report.setImage(newimage.uri, newimage.width, newimage.height);
                setLoading(false);
                setImageTaken(true);
                //TODO: Use photo uri path to send to Report.
              }
            }}
          >
            <SvgUri source={require("../assets/Icons/take_photo.svg")} />
          </TouchableOpacity>
        </View>
      </View>
    </Camera>
  ) : (
    <View
      style={{
        display: "flex",
        flex: 1,
      }}
    >
      <View
        style={{
          width: Dimensions.get("window").width,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 30,
          backgroundColor: "#2F4357",
        }}
      >
        <Headline text="Picture" />
        <CameraText text="Review the picture" />
      </View>
      <Image
        source={{ uri: report.getImage().uri }}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").width,
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#2F4357",
        }}
      >
        <TouchableOpacity
          style={styles.pictureButton}
          onPress={async () => {
            await FileSystem.deleteAsync(pictureURI);
            globals.report.setImage("");
            setImageTaken(false);
          }}
        >
          <Text style={{ color: "white" }}>Take new Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.pictureButton}
          onPress={() => {
            navigation.push("QRScreen");
          }}
        >
          <Text style={{ color: "white" }}>Confirm</Text>
        </TouchableOpacity>
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
  noCamera: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  pictureButton: {
    display: "flex",
    borderRadius: 90,
    width: 150,
    height: 48,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E77F64",
  },
});

export default CameraSceen;
