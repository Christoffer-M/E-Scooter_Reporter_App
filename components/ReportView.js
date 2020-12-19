import React from "react";
import { StyleSheet, View, Image, Text, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AppLoading from "expo-app-loading";
import BackButton from "../components/BackButton"; // Maybe delete and don't use?
import { storage } from "firebase";
//TODO: IF IT IS USED FOR MODAL VIEW, THERE SHOULD BE AN "X" CLOSE BUTTON
//TODO: IF IT IS USED FOR SCREEN VIEW, THERE SHOULD BE A BACK BUTTON
const ReportView = (props) => {
  let testAdress = "Herninggade 9, 2100 København Ø";
  let testBrand = "Lime";
  let testArr = ["Misplaced", "Laying Down", "Broken", "Other"];
  let randomId = Math.floor(Math.random() * Date.now());

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
      // MAYBE ADD BACKBUTTON?
    >
      <Text style={styles.headline}>Report ID: {randomId}</Text>
      <View style={styles.pictureContainer}>
        <Image
          style={{
            borderColor: "orange",
            borderWidth: 1,
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
          source={require("../assets/scoot_crash.png")}
        />
      </View>
      <Text
        numberOfLines={1}
        style={{
          textTransform: "capitalize",
          flexWrap: "nowrap",
          color: "white",
          fontSize: 20,
          flex: 0.1,
          alignSelf: "center",
          marginTop: -15,
        }}
      >
        📌 {testAdress}
      </Text>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.headerFont}>Brand: {testBrand}</Text>
          <Image
            source={require("../assets/brand_logos/logo_lime.png")}
            resizeMode="cover"
            style={{
              height: 35,
              width: 90,
              borderRadius: 8,
            }}
          />
        </View>
        <View style={{ flex: 0.4, display: "flex" }}>
          <Text style={styles.headerFont}>Violations:</Text>
          <View style={styles.categoriesContainer}>
            {testArr.map((item, key) => {
              return (
                <View
                  key={key}
                  style={{
                    backgroundColor: "#FBEFE8",
                    padding: 6,
                    marginRight: 6,
                    marginBottom: 6,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontFamily: "RobotoMono_500Medium" }}
                  >
                    {item}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        {testArr.includes("Other") ? (
          <View style={{ flex: 0.3 }}>
            <Text style={styles.headerFont}>Description:</Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              {"THAT IS SUPER NICE"}
            </Text>
          </View>
        ) : (
          <View />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#2F4357",
    flex: 1,
  },
  headline: {
    fontSize: 35,
    fontFamily: "RobotoMono_700Bold",
    color: "#EBC2AD",
    textAlign: "center",
    alignSelf: "center",
  },
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    height: Dimensions.get("window").height * 1.3,
    width: Dimensions.get("window").width,
    backgroundColor: "#2F4357",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  headerFont: {
    paddingBottom: 2,
    alignSelf: "flex-start",
    color: "#EBC2AD",
    fontSize: 20,
    fontFamily: "RobotoMono_500Medium",
  },
  pictureContainer: {
    padding: 20,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    alignSelf: "center",
    alignItems: "center",
  },
  infoText: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
    alignSelf: "center",
    flex: 0.1,
  },
  categoriesContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
export default ReportView;
