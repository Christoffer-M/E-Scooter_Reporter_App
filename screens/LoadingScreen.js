import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet} from "react-native";
import firebase from 'firebase';

const LoadingScreen = (props) => {
    useEffect(() => {
        this.checkIfLoggedIn();
    });

    checkIfLoggedIn = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) 
            {
                this.props.nav.navigate('Home');
            } else {
                this.props.nav.navigate('Welcome');
            }
        })
    }

    return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#E77F64" />
        </View>
      );
}

const styles = StyleSheet.create({
    loading: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });

export default LoadingScreen;