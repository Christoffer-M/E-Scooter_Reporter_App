import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import {
    useFonts,
    RobotoMono_700Bold,
  } from '@expo-google-fonts/roboto-mono';
    import { AppLoading } from 'expo';

const Headline = () => {
    let [fontsLoaded] = useFonts({
        RobotoMono_700Bold,
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    
    return (
        <View style={styles.container}>
             <Text style={styles.header}>Welcome!</Text>
        </View>
       
    ); 
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        fontSize: 35,
        fontFamily: 'RobotoMono_700Bold',
        color: '#EBC2AD'
    },

    container: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Headline;