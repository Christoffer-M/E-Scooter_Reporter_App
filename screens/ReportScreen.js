import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, Dimensions } from "react-native";
import { useFonts, RobotoMono_500Medium } from "@expo-google-fonts/roboto-mono";
import { AppLoading } from "expo";
import Headline from "../components/Headline.js";
import Button from "../components/Button.js";
import BackButton from "../components/BackButton";
import * as globals from "../components/Global.js";

const ReportScreen = ({ navigation }) => {
  const [categoryArray, setArray] = useState([]);

  useEffect(() => {
    setArray(globals.report.getCategories());
  }, []);

  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <BackButton nav={navigation} />
      <Headline text="Your report" flex={{ flex: 0.1 }} />
      <Text style={styles.infoText}>Violations</Text>
      <View style={styles.pictureContainer}>
        <Image
          style={{
            position: "absolute",
            height: '100%',
            width: '81%',
            borderColor:"orange",
            borderWidth: 1,

          }}
          resizeMode="cover"
          source={{
            uri:
              "https://www.tynker.com/projects/screenshot/5be44859c762c1449610d20b/derp-derpy-derp-derp-derp-derp-derpy-deeerrrrrpppp.png",
          }}
        />
        
      </View>
        <Text style={{color:"white", fontSize: 20}}>📌 Location</Text>
      
          <View style={{flex: 0.1, width:'90%'}}>
          <Text style={styles.headerFont}>Brand:</Text>
      </View>
      <View style={{flex: 0.2, width:'90%', display:"flex"}}>
        <Text style={styles.headerFont}>Violations:</Text>
          <View style={styles.categoriesContainer}>
          
            {categoryArray.map((item, key) => {
              return <View   key={key} style={{backgroundColor:"#ffff", padding: 5, margin: 3, borderRadius: 5}} >
                <Text style={{fontSize:18, fontFamily:"RobotoMono_500Medium"}}>{item}</Text>
              </View>;
            })}
        </View>
      </View>
      <View style={{flex: 0.1, width:'90%'}}>
          <Text style={styles.headerFont}>Description:</Text>
          <Text style={{fontSize:16, color:"white"}}>Other Description</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          text="Submit"
          color="orange"
          nav={navigation}
          navDir="Success"
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    width:Dimensions.get('window').width,
    flex: 1,
    backgroundColor: "#2F4357",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  headerFont: {
    alignSelf:"flex-start", 
    color:"#EBC2AD", 
    fontSize:20, 
    fontFamily:"RobotoMono_500Medium",
  },
  pictureContainer: {
    flex: 0.5,
    position:"relative",
    width: Dimensions.get('window').width,
    alignItems:"center",

  },
  infoText: {
    fontFamily: "RobotoMono_500Medium",
    color: "#FBEFE8",
    fontSize: 18,
    lineHeight: 36,
    textAlign: "center",
    flex: 0.1,
  },
  categoriesContainer: {
    height: 200,
    flex: 1,
    flexDirection: "row",
    flexWrap:"wrap",
  },
  buttonContainer: {
    paddingBottom: 40,
    flex: 0.1,
  },
});

export default ReportScreen;
