import SvgUri from "expo-svg-uri";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BrandLogoImage from "../components/BrandLogoImage";
//TODO: IF IT IS USED FOR MODAL VIEW, THERE SHOULD BE AN "X" CLOSE BUTTON
const ReportView = ({ report, modalVisible, setVisible }) => {
  const [uuid, setUUID] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageURI, setImageURI] = useState();
  const [brand, setBrand] = useState("Unknown");

  useEffect(() => {
    if (report !== undefined) {
      if (report.uuid !== uuid) {
        setUUID(report.uuid);
        setAddress(report.address);
        setCategories(report.getCategories());
        setImageURI(report.imageURL);
        setBrand(report.getBrand());
        console.log(report.brand);
      }
    }
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => {
        setVisible(false);
      }}
      visible={modalVisible}
    >
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        // MAYBE ADD BACKBUTTON?
      >
        <TouchableOpacity
          onPress={() => {
            setVisible(false);
          }}
        >
          <SvgUri source={require("../assets/cross.svg")}></SvgUri>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "stretch",
          }}
        >
          <Text style={styles.headline}>Report ID: </Text>
          <Text style={styles.normalFont}>{uuid}</Text>
        </View>
        <View style={styles.pictureContainer}>
          <Image
            style={{
              borderColor: "orange",
              borderWidth: 1,
              width: "100%",
              height: "100%",
            }}
            resizeMode="contain"
            source={{ uri: imageURI }}
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
            paddingBottom: 10,
          }}
        >
          📌 {address}
        </Text>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flex: 0.15,
              flexDirection: "row",
              paddingTop: 10,
              paddingBottom: 15,
            }}
          >
            <Text style={styles.headerFont}>Brand:</Text>
            <BrandLogoImage logo={brand} style={{ marginLeft: 10 }} />
          </View>
          <View style={{ flex: 0.4, display: "flex" }}>
            <Text style={styles.headerFont}>Violations:</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((item, key) => {
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
                      style={{
                        fontSize: 18,
                        fontFamily: "RobotoMono_500Medium",
                      }}
                    >
                      {item}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          {categories.includes("Other") ? (
            <View style={{ paddingBottom: 15 }}>
              <Text style={styles.headerFont}>Description:</Text>
              <Text style={{ fontSize: 16, color: "white" }}>
                {report.comment}
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      </KeyboardAwareScrollView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#2F4357",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  headline: {
    fontSize: 35,
    fontFamily: "RobotoMono_700Bold",
    color: "#EBC2AD",
    textAlign: "center",
    alignSelf: "center",
  },
  container: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 20,
    paddingRight: 20,
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
  normalFont: {
    paddingBottom: 2,
    alignSelf: "center",
    color: "#fff",
    fontSize: 16,
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
    paddingBottom: 15,
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

export default ReportView;
