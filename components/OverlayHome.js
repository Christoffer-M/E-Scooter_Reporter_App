import React from "react";
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
import CustomButton from "./CustomButton";
import { CommonActions } from "@react-navigation/native";

const OverlayHome = ({ transform, navigation, animate, report }) => {
  return (
    <Animated.View
      style={{
        position: "absolute",
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
          flex: 0.1,
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
            animate();
          }}
        >
          <SvgUri
            width="25"
            height="25"
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
          flex: 0.8,
        }}
      >
        <ScrollView fadingEdgeLength={50} indicatorStyle={'"white"'}>
          {report}
        </ScrollView>
      </SafeAreaView>

      <View
        style={{
          alignSelf: "stretch",
          justifyContent: "flex-start",
          flex: 0.1,
        }}
      >
        <CustomButton
          text="Log out"
          onPress={() => {
            storage.signOut();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Welcome" }],
              })
            );
          }}
          style={{ width: 150, justifyContent: "center", height: 50 }}
          textStyle={{ fontSize: 20 }}
        />
      </View>
    </Animated.View>
  );
};

export default OverlayHome;
