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
  ActivityIndicator,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BrandLogoImage from "../components/BrandLogoImage";
import CustomButton from "./CustomButton";
import * as storage from "../data_model/Storage";
//TODO: IF IT IS USED FOR MODAL VIEW, THERE SHOULD BE AN "X" CLOSE BUTTON
const ReportView = ({ report, modalVisible, setVisible, updateList }) => {
  const [uuid, setUUID] = useState("");
  const [address, setAddress] = useState("");
  const [categories, setCategories] = useState([]);
  const [imageURI, setImageURI] = useState();
  const [brand, setBrand] = useState("Unknown");
  const [timeStamp, setTimeStamp] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (report !== undefined) {
      if (report.uuid !== uuid) {
        setUUID(report.uuid);
        setAddress(report.address);
        setCategories(report.getCategories());
        setImageURI(report.imageURL);
        setBrand(report.getBrand());
        setTimeStamp(report.getReadableTimestamp());
        setComment(report.comment);
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
          style={{ paddingTop: 30 }}
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
              borderColor: "#5B7282",
              borderWidth: 2,
              width: "100%",
              height: "100%",
            }}
            resizeMode="contain"
            source={{ uri: imageURI }}
          />
        </View>
        <Text style={styles.headerFont}>Date:</Text>
        <Text numberOfLines={2} style={styles.infoText}>
          {timeStamp}
        </Text>
        <Text style={styles.headerFont}>Location:</Text>
        <Text numberOfLines={2} style={styles.infoText}>
          {address}
        </Text>

        <View>
          <Text style={styles.headerFont}>Brand:</Text>
          <BrandLogoImage style={{ marginBottom: 15 }} logo={brand} />
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
        {categories.includes("Other") && comment.length > 0 ? (
          <View style={{ paddingBottom: 15 }}>
            <Text style={styles.headerFont}>Description:</Text>
            <Text style={{ fontSize: 16, color: "white" }}>{comment}</Text>
          </View>
        ) : (
          <></>
        )}
        <View
          style={{
            marginBottom: 20,
            alignSelf: "center",
            marginTop: 50,
          }}
        >
          <CustomButton
            text={"Delete Report"}
            style={{
              backgroundColor: "#c40000",
              width: 200,
              justifyContent: "center",
            }}
            textStyle={{
              textTransform: "capitalize",
              flexWrap: "nowrap",
              color: "white",
              fontSize: 18,
              fontFamily: "RobotoMono_500Medium",
            }}
            onPress={() => {
              Alert.alert(
                "Please confirm your choice",
                "You are about to delete this report permanently. Are you sure you want to do this? ",
                [
                  {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      setLoading(true);
                      storage.deleteReport(report).then(async (res) => {
                        if (res) {
                          setVisible(false);
                          await updateList();
                          setLoading(false);
                        } else {
                          setLoading(false);
                          setVisible(false);
                          console.log("FAILURE!");
                        }
                      });
                    },
                  },
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
      </KeyboardAwareScrollView>
      {loading ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            height: Dimensions.get("screen").height,
            width: Dimensions.get("screen").width,
            backgroundColor: " rgba(0,0,0,0.5)",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#E77F64" />
        </View>
      ) : (
        <></>
      )}
    </Modal>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#2F4357",
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
    textTransform: "capitalize",
    flexWrap: "nowrap",
    color: "white",
    fontSize: 16,
    paddingBottom: 10,
    fontFamily: "RobotoMono_500Medium",
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
