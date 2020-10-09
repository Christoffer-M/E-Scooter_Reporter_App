import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Headline = () => {
    return (
        <Text style={styles.header}>Login Page</Text>
    ); 
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 35,
    },
});
export default Headline;