import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import OrangeButton from '../components/OrangeButtons';
import Headline from '../components/Headline';
import WhiteButton from '../components/WhiteButton';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const HomeScreen = ({navigation}) => {

    return (
    <View style={styles.container}>
        <View style={{marginRight: 15, marginLeft: 15}}>
            <Headline/>
            <Text style={styles.fontStyle}>Would you like to sign up or continue as a guest?</Text>
            <OrangeButton nav={navigation} navDir='Login'/>
            <WhiteButton/>
            <StatusBar style="auto" />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    fontStyle: {
      color: '#FBEFE8',
      fontSize: 18,
      lineHeight: 36,
      textAlign: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#2F4357',
        alignItems: 'center',
        justifyContent: 'center', 
      },
  });

export default HomeScreen;