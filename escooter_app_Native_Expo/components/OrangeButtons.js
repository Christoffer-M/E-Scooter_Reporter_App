import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import {
  useFonts,
  RobotoMono_500Medium,
} from '@expo-google-fonts/roboto-mono';
import { AppLoading } from 'expo';

const OrangeButton = (props) => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  if (!fontsLoaded) {
      return <AppLoading />;
  }

    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity title="Press me" style={styles.orangeButton}  onPress={() => props.nav.push('Login')}>
             <Text style={styles.whiteFont}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({

    orangeButton: {
      borderRadius: 90,
      backgroundColor: '#E77F64',
      width: 200,
      height: 48,
      alignItems: 'center',
      padding: 8,
    },

    buttonContainer: {
      alignItems: 'center',     
      justifyContent: "center",
      paddingTop: 15,
    },

    container: {
      alignItems: 'center',     
      justifyContent: "center",
      paddingTop: 15,
    },

    whiteFont: {
      fontFamily: 'RobotoMono_500Medium',
      fontSize: 24,
      color: '#fff',
    },

});

export default OrangeButton;