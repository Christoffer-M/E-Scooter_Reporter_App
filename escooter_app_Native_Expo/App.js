import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Buttons from './components/Buttons';
import Headline from './components/Headline';

export default function App() {
  return (
    <View style={styles.container}> 
      <View style={{marginRight: 15, marginLeft: 15}}>
            <Headline/>
            <Text style={styles.fontStyle}>Would you like to sign up or continue as a guest?</Text>
            <Buttons/>
            <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4357',
    alignItems: 'center',
    justifyContent: 'center', 
  },

  textContainer: {
    color: '#C0C0C0',
    width:'500px',
  }, 
  
  fontStyle: {
    color: '#FBEFE8',
    fontSize: 18,
    lineHeight: 36,
    textAlign: 'center',
  },
});
