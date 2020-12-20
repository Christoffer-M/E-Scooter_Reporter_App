import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as storage from "../data_model/Storage";

const CategoryButton = (props) => {
  const [isClicked, SetIsClicked] = useState(false);
  const [currentButtonColor, setColor] = useState("#E77F64");
  const [fontColor, setFontColor] = useState("#fff");
  const [firstRun, setFirstRun] = useState(false);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    if (!firstRun) {
      const categoryArray = storage.getReport().getCategories();
      if (categoryArray.length > 0) {
        categoryArray.forEach((element) => {
          if (element === props.text) {
            setText(props.text);
            props.add(props.text);
            setColor("#EBC2AD");
            setFontColor("#2F4357");
            SetIsClicked(true);
          }
        });
      }
      setFirstRun(true);
    }
  }, []);

  function changeBackground() {
    if (!isClicked) {
      setColor("#EBC2AD");
      setFontColor("#2F4357");
      SetIsClicked(true);
      switch (props.text) {
        case "Misplaced":
          storage.getReport().toggleMisplaced();
          props.add(props.text);
          setText(props.text + "  🛴 ");
          break;
        case "Laying Down":
          storage.getReport().toggleLaying();
          props.add(props.text);
          setText(props.text + "  🛴 ");
          break;
        case "Broken":
          storage.getReport().toggleBroken();
          props.add(props.text);
          setText(props.text + "  🛴 ");

          break;
        case "Other":
          storage.getReport().toggleOther();
          props.setOther(true);
          props.add(props.text);
          setText(props.text + "  🛴 ");
          break;
      }
    } else {
      setColor("#E77F64");
      setFontColor("#fff");
      SetIsClicked(false);
      switch (props.text) {
        case "Misplaced":
          storage.getReport().toggleMisplaced();
          props.remove(props.text);
          setText(props.text);
          break;
        case "Laying Down":
          storage.getReport().toggleLaying();
          props.remove(props.text);
          setText(props.text);
          break;
        case "Broken":
          storage.getReport().toggleBroken();
          props.remove(props.text);
          setText(props.text);
          break;
        case "Other":
          storage.getReport().toggleOther();
          props.remove(props.text);
          props.setOther(false);
          setText(props.text);

          break;
      }
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.orangeButton, { backgroundColor: currentButtonColor }]}
        onPress={() => changeBackground()}
      >
        <Text style={[styles.font, { color: fontColor }]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  orangeButton: {
    display: "flex",
    width: 250,
    height: 50,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    paddingBottom: 20,
  },
  font: {
    fontFamily: "RobotoMono_500Medium",
    fontSize: 22,
  },
});
export default CategoryButton;
