import React from 'react';
import Camera from '../components/Camera.js';
import { SafeAreaView } from 'react-native';

const CameraScreen = () => {
    return (
      <SafeAreaView style={{flex: 1}}><Camera/></SafeAreaView>
   )
}
export default CameraScreen;

