import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Headline from './components/Headline';

export default function App() {
  return (
    <View style={styles.container}> 
      <View style={{marginRight: 15, marginLeft: 15}}>
            <Headline/>
            <Text>Open up Apps.js to start working on your app! Damn this is pretty cool</Text>
            <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },

  textContainer: {
    color: '#C0C0C0',
    width:'500px',
  },
});
