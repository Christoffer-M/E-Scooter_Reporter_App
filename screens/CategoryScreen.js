import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  KeyboardAware,
} from "react-native";
import Headline from "../components/Headline";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CategoryButton from "../components/CategoryButton";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import Buttons from "../components/Button";

const CategoryScreen = ({ navigation }) => {
  const [isOtherPress, setOther] = useState(false);

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
      <Headline text="What is wrong?" flex={{ flex: 0.2 }} />
      <Text style={styles.description}>
        Please choose one or more categories that fits the violation you wish to
        report
      </Text>
      <View style={styles.buttons}>
        <CategoryButton text="Misplaced" id="0" />
        <CategoryButton text="Laying Down" id="1" />
        <CategoryButton text="Broken" id="2" />
        <CategoryButton text="Other" id="3" setOther={setOther} />
        {isOtherPress ? (
          <View>
            <Text style={styles.description}>Please Describe</Text>
            <TextInput
              style={{
                width: 250,
                height: 40,
                borderColor: "gray",
                borderRadius: 90,
                borderWidth: 1,
                backgroundColor: "#fff",
                textAlign: "center",
                fontSize: 16,
                fontFamily: "RobotoMono_500Medium",
              }}
              placeholder="Type here"
            />
          </View>
        ) : (
          <View style={{ flex: 1 }} />
        )}
      </View>
      <View style={{ justifyContent: "flex-end" }}>
        <Buttons
          nav={navigation}
          navDir="Report"
          color="orange"
          text="Proceed"
        />
        <Text style={styles.infoText}>* Select one or more options</Text>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#2F4357",
    flex: 1,
  },

  container: {
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#2F4357",
    paddingTop: 50,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },

  description: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
  },
  infoText: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
    paddingBottom: 15,
  },
  buttons: {
    alignItems: "center",
    paddingTop: 20,
    flex: 1,
  },
});

export default CategoryScreen;
