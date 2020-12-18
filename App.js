import "./components/Global";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import WelcomeScreen from "./screens/WelcomeScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import CameraScreen from "./screens/CameraScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import QRScreen from "./screens/QRScreen";
import CategoryScreen from "./screens/CategoryScreen";
import ReportScreen from "./screens/ReportScreen";
import SuccessScreen from "./screens/SuccessScreen";

/*
THIS "main" method takes care of the navigation bewteen the different screens 
in our app. For this purpose we use StackNavigator 🛴 
*/
export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="QRScreen" component={QRScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Report" component={ReportScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
