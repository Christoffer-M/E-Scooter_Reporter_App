import React from 'react';
import { StyleSheet, Text, View, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import Headline from '../components/Headline';

const HomeScreen = ({navigation}) => {
    return (
    <View style={styles.container}>
        <View style={{marginRight: 15, marginLeft: 15}}>
            <Headline/>
            <TextInput style={{ width:300, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#fff'}} />
            <TextInput style={{ width:300, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: '#fff'}} />
            <Button nav={navigation} navDir='Login' text='Log in' color='orange'/>
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