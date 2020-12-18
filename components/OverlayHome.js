import React from "react";
import { Animated, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SvgUri from "expo-svg-uri";
import Headline from "./Headline";
import OverlayReport from "./OverlayReport";

const OverlayHome = (props) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
        height: Dimensions.get("window").height,
        width: 280,
        backgroundColor: "rgba(47, 67, 87, 0.9)",
        left: 0,
        flex: 1,
        transform: [{ translateX: props.transform }],
      }}
    >
      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "flex-end",
          borderRadius: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}
        onPress={() => {
          props.animate();
        }}
      >
        <SvgUri
          width="35"
          height="35"
          source={require("../assets/Icons/Group.svg")}
        ></SvgUri>
      </TouchableOpacity>
      <Headline text="Reports" flex={{ flex: 0.1 }} />
      <OverlayReport />
    </Animated.View>
  );
};

export default OverlayHome;
