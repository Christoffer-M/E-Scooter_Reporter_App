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
import { Camera } from "expo-camera";
import SvgUri from "expo-svg-uri";
import CameraText from "../components/CameraText";
import * as storage from "../data_model/Storage";
import * as FileSystem from "expo-file-system";
import * as imagehandler from "../utility/ImageHandler";
import * as Location from "expo-location";
import Headline from "../components/Headline";
import BackButton from "../components/BackButton";
import CustomButton from "../components/CustomButton";

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

  async function setLocation() {
    const location = await Location.getCurrentPositionAsync({});
    storage
      .getReport()
      .setGeoLocation(location.coords.latitude, location.coords.longitude);
  }

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
            paddingTop: 50,
            backgroundColor: "#2F4357",
          }}
        >
          <BackButton nav={navigation}></BackButton>
          <Text style={styles.informationText}>
            Take a picture of the violating picture
          </Text>
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
              backgroundColor: "#2F4357",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color="#E77F64" />
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

                const newimage = await imagehandler.cropImageToSquare(
                  photo.uri,
                  photo.width,
                  photo.height
                );
                storage.getReport().setImageUri(newimage.uri); // We only need the uri in the report
                storage.getReport().setTimestampToNow();
                setLoading(false);
                setImageTaken(true);
                //TODO: ^ NO, get the photo name from report.imageName
              }
            }}
          >
            <SvgUri source={require("../assets/Icons/camera_button.svg")} />
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
        <Text style={styles.informationText}>Is the picture okay?</Text>
      </View>
      <Image
        source={{ uri: storage.getReport().imageURI }}
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
          style={styles.orangeButton}
          onPress={() => {
            navigation.push("QRScreen");
            setLocation();
          }}
        >
          <Text style={{ color: "white", fontFamily: "RobotoMono_500Medium" }}>
            Yes, continue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.whiteButton}
          onPress={async () => {
            await FileSystem.deleteAsync(pictureURI);
            storage.getReport().setImageUri("");
            setImageTaken(false);
          }}
        >
          <Text style={{ color: "white", fontFamily: "RobotoMono_500Medium" }}>
            Take a new picture
          </Text>
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

  orangeButton: {
    display: "flex",
    borderRadius: 90,
    width: 180,
    height: 48,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E77F64",
  },

  whiteButton: {
    display: "flex",
    borderRadius: 90,
    width: 180,
    height: 48,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#5B7282",
  },

  informationText: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 20,
    lineHeight: 36,
    textAlign: "center",
    paddingHorizontal: 50,
  },
});

export default CameraSceen;
