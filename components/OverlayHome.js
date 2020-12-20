import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgUri from "expo-svg-uri";
import Headline from "./Headline";
import * as storage from "../data_model/Storage";
import OverlayReport from "./OverlayReport";
import { useFocusEffect } from "@react-navigation/native";
import CustomButton from "./CustomButton";

const OverlayHome = ({ transform, navigation, animate }) => {
  const [reports, setReports] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fillreports();
      console.log("GOGO");
    }, [])
  );

  useEffect(() => {
    console.log();
    fillreports();
  }, []);

  function fillreports() {
    console.log("GOING!");
    const temparr = [];
    console.log(storage.userReports);
    storage.getUserReports().forEach((obj) => {
      console.log("GOING123");
      const address = obj.address;
      const imageURI = obj.imageURL;
      const date = obj.timestamp.seconds;

      var time = new Date(1970, 0, 1); // Epoch
      time.setSeconds(date);
      const key = obj.uuid;

      console.log(obj);
      temparr.push(
        <OverlayReport
          address={address}
          imageURI={imageURI}
          key={key}
          date={time.toLocaleString()}
        />
      );
    });
    setReports(temparr);
  }

  return (
    <Animated.View
      style={{
        position: "absolute",
        justifyContent: "space-between",
        width: Dimensions.get("window").width * 0.8,
        backgroundColor: "rgba(47, 67, 87, 0.9)",
        alignSelf: "stretch",
        height: Dimensions.get("window").height,
        left: 0,
        flex: 1,
        transform: [{ translateX: transform }],
      }}
    >
      <View
        style={{
          height: Dimensions.get("window").height * 0.12,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            alignSelf: "flex-start",
            paddingLeft: 10,
            paddingBottom: 5,
          }}
          onPress={() => {
            fillreports();
            animate();
          }}
        >
          <SvgUri
            width="25"
            height="30"
            source={require("../assets/Icons/Group.svg")}
          ></SvgUri>
        </TouchableOpacity>
        <Headline
          text="Reports"
          style={{
            flex: 1,
            alignSelf: "flex-end",
            marginRight: 30,
          }}
        />
      </View>
      <SafeAreaView
        style={{
          height: Dimensions.get("window").height * 0.8,
        }}
      >
        <ScrollView>{reports}</ScrollView>
      </SafeAreaView>

      <View
        style={{
          alignSelf: "center",
          justifyContent: "center",
          height: Dimensions.get("window").height * 0.08,
          paddingBottom: 200,
        }}
      >
        <CustomButton
          text="Log out"
          onPress={() => {
            storage.signOut();
            navigation.push("Welcome");
          }}
          style={{ width: 150, justifyContent: "center" }}
          textStyle={{ fontSize: 20 }}
        />
      </View>
    </Animated.View>
  );
};

export default OverlayHome;
