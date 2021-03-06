import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  BackHandler,
  Alert,
  Animated,
  Image,
  Text,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import * as Location from "expo-location";
import CustomButton from "../components/CustomButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgUri from "expo-svg-uri";
import OverlayHome from "../components/OverlayHome";
import * as storage from "../data_model/Storage";
import * as firebases from "firebase/app";
import OverlayReport from "../components/OverlayReport";
import ReportView from "../components/ReportView";

const HomeScreen = ({ navigation }) => {
  const transform = useRef(
    new Animated.Value(-Dimensions.get("window").width * 0.8)
  ).current;
  const [location, setLocation] = useState(null);
  const [isPress, setIsPress] = useState(false);
  const [iconURL, setIconURL] = useState(null);
  const [user, setUser] = useState(null);
  const isGuest = useRef(storage.isGuest()).current;
  const [reports, setReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalReport, setModalReport] = useState();
  const [markers, setMarkers] = useState([]);
  let startup = true;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      setLocation(await Location.getLastKnownPositionAsync());
      await storage.syncReports();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        navigation.goBack();
      } else {
        const newMarkers = await createMarkers();
        setMarkers(newMarkers);
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location); //TODO Duplicates?
        storage.setLocation(location); //TODO Duplicates?
        startup = false;
      }
    })();
  }, []);

  useEffect(() => {
    if (storage.isGuest() === false) {
      if (user === null) {
        firebases.auth().onAuthStateChanged((user) => {
          if (user) {
            setUser(user);
            if (iconURL === null) {
              setIconURL(user.photoURL);
            }
          }
        });
      }
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", onbackpress);
      (async () => {
        if (!startup) {
          await storage.syncReports();
          const newMarkers = await createMarkers();
          setMarkers(newMarkers);
        }
      })();

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onbackpress);
      };
    }, [])
  );

  function onbackpress() {
    Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  }

  async function createMarkers() {
    let arr = [];
    const res = await new Promise((resolve) => {
      for (let index = 0; index < storage.userReports.length; index++) {
        arr.push(
          <Marker
            coordinate={{
              latitude: storage.userReports[index].getGeoLocationLatitude(),
              longitude: storage.userReports[index].getGeoLocationLongitude(),
            }}
            key={
              index + "_" + storage.userReports[index].getReadableTimestamp()
            }
            onPress={() => {
              openModal(storage.userReports[index]);
            }}
            image={require("../assets/map/map_marker_icon.png")}
          />
        );
      }
      if (arr.length === storage.userReports.length) {
        resolve();
      }
    })
      .then(() => {
        return arr;
      })
      .catch((err) => {
        console.log(err);
      });
    return res;
  }

  function animate() {
    const width = Dimensions.get("window").width;
    if (isPress) {
      setIsPress(false);
      Animated.timing(transform, {
        toValue: -width,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      setIsPress(true);
      Animated.timing(transform, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }

  async function updateList() {
    await storage.syncReports();
    if (storage.getUserReports().length === reports.length) {
      console.log("nothing to report...");
    } else {
      setReports(
        storage.userReports.map((obj, i) => {
          return <OverlayReport key={i} report={obj} openModal={openModal} />;
        })
      );
      const newMarkers = await createMarkers();
      setMarkers(newMarkers);
    }
  }

  function openModal(report) {
    setModalReport(report);
    setModalVisible(true);
  }

  if (location == null) {
    return (
      <View style={[styles.loading]}>
        <Text
          style={{
            fontFamily: "RobotoMono_500Medium",
            fontSize: 18,
            paddingBottom: 10,
            color: "#EBC2AD",
          }}
        >
          Getting your location...
        </Text>
        <ActivityIndicator size="large" color="#E77F64" />
      </View>
    );
  }

  if (user === null && isGuest === false) {
    return (
      <View style={[styles.loading]}>
        <Text style={{ fontFamily: "RobotoMono_500Medium", color: "#E77F64" }}>
          User detected, please wait
        </Text>
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
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        onTouchStart={() => {
          if (isPress) {
            animate();
          }
        }}
      >
        {markers}
      </MapView>

      <View style={styles.menuButton}>
        <TouchableOpacity
          onPress={() => {
            updateList();
            animate();
          }}
        >
          {iconURL !== null ? (
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 90,
                borderWidth: 2,
                borderColor: "#E77F64",
              }}
              source={{
                uri: iconURL,
              }}
            />
          ) : (
            <SvgUri
              width="60"
              height="60"
              source={require("../assets/Icons/profile_icon.svg")}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.reportButton}>
        <CustomButton
          onPress={() => {
            storage.newReport();
            navigation.push("Camera");
          }}
          text="Report"
        />
      </View>
      <OverlayHome
        animate={animate}
        transform={transform}
        navigation={navigation}
        report={reports}
      />
      <ReportView
        report={modalReport}
        modalVisible={modalVisible}
        setVisible={setModalVisible}
        updateList={updateList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: "#2F4357",
    alignItems: "center",
    justifyContent: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    height: Dimensions.get("window").height,
  },

  reportButton: {
    position: "absolute",
    bottom: 0,
    paddingBottom: 60,
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
  overlay: {
    position: "absolute",
    height: Dimensions.get("window").height,
    width: 280,
    backgroundColor: "#000",
  },
  overlayShow: {
    height: Dimensions.get("window").height,
    width: 280,
    backgroundColor: "#000",
  },
});

export default HomeScreen;
