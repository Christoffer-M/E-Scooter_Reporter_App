import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Dimensions,
  Animated,
} from "react-native";
import Headline from "../components/Headline";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CategoryButton from "../components/CategoryButton";
import CustomButton from "../components/CustomButton";
import * as storage from "../data_model/Storage";
import BackButton from "../components/BackButton";

const CategoryScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [isOtherPress, setOther] = useState(false);
  const [hideInput, setHideInput] = useState(false);
  const [value, onChangeText] = useState("");
  const [hideProcess, setHideProceed] = useState(false);
  const [toggles, setToggles] = useState([]);
  const categories = ["Misplaced", "Laying Down", "Broken", "Other"];
  const categoryButtons = [];
  fillCategoryArray();

  useEffect(() => {
    if (isOtherPress) {
      setHideInput(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setTimeout(() => {
        setHideInput(false);
      }, 200);
    }
  });

  function add(categori) {
    const arr = toggles;
    arr.push(categori);
    setToggles(arr);
    if (hideProcess === false && arr.length > 0) {
      setHideProceed(true);
    }
  }

  function remove(categori) {
    const arr = toggles;
    arr.push(categori);
    const index = arr.indexOf(categori);
    if (index > -1) {
      arr.splice(index);
      setToggles(arr);
    }
    if (hideProcess === true && arr.length < 1) {
      setHideProceed(false);
    }
  }

  function fillCategoryArray() {
    for (let index = 0; index < categories.length; index++) {
      if (categories[index] !== "Other") {
        categoryButtons.push(
          <CategoryButton
            text={categories[index]}
            id={index}
            add={add}
            remove={remove}
            key={index}
          />
        );
      } else {
        categoryButtons.push(
          <CategoryButton
            text={categories[index]}
            id={index}
            setOther={setOther}
            add={add}
            remove={remove}
            key={index}
          />
        );
      }
    }
  }

  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      style={styles.scrollView}
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
      <BackButton nav={navigation}></BackButton>
      <Headline text="What is wrong?" style={{ flex: 0.2 }} />
      <Text style={styles.description}>
        Please choose one or more categories that fits the violation you wish to
        report
      </Text>
      <View style={styles.buttons}>
        {categoryButtons}
        <Animated.View style={{ opacity: fadeAnim }}>
          {hideInput ? (
            <>
              <Text style={styles.description}>Please Describe</Text>
              <TextInput
                style={{
                  width: Dimensions.get("window").width / 1.3,
                  height: 45,
                  borderColor: "gray",
                  borderRadius: 90,
                  borderWidth: 1,
                  backgroundColor: "#fff",
                  textAlign: "left",
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontSize: 18,
                  fontFamily: "RobotoMono_500Medium",
                }}
                placeholder="Type here"
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
            </>
          ) : (
            <></>
          )}
        </Animated.View>
      </View>

      <View style={{ justifyContent: "flex-end" }}>
        {hideProcess ? (
          <CustomButton
            onPress={() => {
              navigation.push("Report");
              storage.getReport().setComment(value);
            }}
            text="Proceed"
          />
        ) : (
          <></>
        )}

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
