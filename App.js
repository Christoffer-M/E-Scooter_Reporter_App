import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QRScreen from "./screens/QRScreen";
import CategoryScreen from "./screens/CategoryScreen";
import ReportScreen from "./screens/ReportScreen";
import SuccessScreen from "./screens/SuccessScreen";
import * as firebase from "firebase/app";
import AppLoading from "expo-app-loading";
import * as storage from "./data_model/Storage";
import {
  useFonts,
  RobotoMono_500Medium,
  RobotoMono_700Bold,
} from "@expo-google-fonts/roboto-mono";
/*
THIS "main" method takes care of the navigation bewteen the different screens 
in our app. For this purpose we use StackNavigator 🛴 
*/
export default function App() {
  const [routenName, setRouteName] = useState("");
  const Stack = createStackNavigator();

  let [fontsLoaded] = useFonts({
    RobotoMono_700Bold,
    RobotoMono_500Medium,
  });

  LogBox.ignoreLogs(["Setting a timer"]);
  useEffect(() => {
    (async () => {
      firebase.auth().onAuthStateChanged((res) => {
        if (res) {
          storage.setUser(res.email);
          setRouteName("Home");
        } else {
          setRouteName("Welcome");
        }
      });
    })();
  }, []);

  if (routenName === "" || !fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={routenName}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="QRScreen" component={QRScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen
          name="Success"
          component={SuccessScreen}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
