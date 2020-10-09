import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import OrangeButton from '../components/OrangeButtons';
import Headline from '../components/Headline';
import WhiteButton from '../components/WhiteButton';

const HomeScreen = () => {
    return (
    <View style={{marginRight: 15, marginLeft: 15}}>
        <Headline/>
        <Text style={styles.fontStyle}>Would you like to sign up or continue as a guest?</Text>
        <OrangeButton/>
        <WhiteButton/>
        <StatusBar style="auto" />
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
  });

export default HomeScreen;