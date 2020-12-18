import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import AppLoading from "expo-app-loading";
import Button from "../components/Button.js";
import BackButton from "../components/BackButton";
import * as globals from "../components/Global.js";

const ReportScreen = ({ navigation }) => {
  const [imageUri, setImage] = useState("");

  useEffect(() => {
    if (globals.report.hasImageURI()) {
      setImage(globals.report.getImage().uri);
    } else {
      setImage(
        "https://i.pinimg.com/originals/8d/ef/54/8def54ebab6fc164e50a6ec426e19937.jpg"
      );
    }
  }, []);

  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
      <BackButton nav={navigation} />
      <Text style={styles.headline}>Your report</Text>
      <View style={styles.pictureContainer}>
        <Image
          style={{
            borderColor: "orange",
            borderWidth: 1,
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
          source={{
            uri: imageUri,
          }}
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
        📌 {globals.report.getAddress()}
      </Text>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.3 }}>
          <Text style={styles.headerFont}>
            Brand: {globals.report.getBrand()}
          </Text>
          <Image
            source={require("../assets/brand_logos/logo_unknown.png")}
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
            {globals.report.getCategories().map((item, key) => {
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
        {globals.report.getCategories().includes("Other") ? (
          <View style={{ flex: 0.3 }}>
            <Text style={styles.headerFont}>Description:</Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              {globals.report.comment}
            </Text>
          </View>
        ) : (
          <View />
        )}
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text="Submit"
          color="orange"
          nav={navigation}
          navDir="Success"
        />
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "pink",
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
    paddingTop: 35,
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
  buttonContainer: {
    flex: 0.1,
    alignSelf: "center",
    justifyContent: "center",
    paddingBottom: 30,
  },
});

export default ReportScreen;
