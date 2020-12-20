import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../components/CustomButton";
import BackButton from "../components/BackButton";
import * as FileSystem from "expo-file-system";
import * as storage from "../data_model/Storage";
import BrandLogoImage from "../components/BrandLogoImage";

const ReportScreen = ({ navigation }) => {
  const [imageUri, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (storage.getReport().hasImage()) {
      setImage(storage.getReport().imageURI);
    } else {
      setImage(
        "https://i.pinimg.com/originals/8d/ef/54/8def54ebab6fc164e50a6ec426e19937.jpg"
      );
    }
  }, []);

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
          source={imageUri ? { uri: imageUri } : null}
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
        📌 {storage.getReport().getReadableAddress()}
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
          <BrandLogoImage
            logo={storage.report.getBrand()}
            style={{ marginLeft: 10 }}
          />
        </View>
        <View style={{ flex: 0.4, display: "flex" }}>
          <Text style={styles.headerFont}>Violations:</Text>
          <View style={styles.categoriesContainer}>
            {storage
              .getReport()
              .getCategories()
              .map((item, key) => {
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
        {storage.getReport().getCategories().includes("Other") ? (
          <View style={{ paddingBottom: 15 }}>
            <Text style={styles.headerFont}>Description:</Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              {storage.getReport().comment}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={async () => {
            //Activates loading overlay while report is being submitted
            setLoading(true);

            //Start report submission process in storage
            await storage.submitReport().then((res) => {
              if (res) {
                navigation.push("Success");

                setLoading(false);
                try {
                  FileSystem.deleteAsync(imageUri);
                  console.log("Image file Deleted", imageUri);
                } catch (error) {
                  console.error(error);
                } finally {
                  storage.syncReports();
                }
              } else {
                setLoading(false);
                Alert.alert(
                  "No connection to server.",
                  "Please try again later",
                  [{ text: "OK", onPress: () => console.log("ok") }],
                  { cancelable: false }
                );
              }
            });
          }}
          text="Submit"
        />
      </View>
      {loading ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            height: Dimensions.get("window").height * 1.2,
            width: Dimensions.get("window").width,
            backgroundColor: " rgba(0,0,0,0.5)",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#E77F64" />
        </View>
      ) : (
        <View></View>
      )}
    </KeyboardAwareScrollView>
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

export default ReportScreen;
