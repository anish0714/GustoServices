import {Text, Image, View} from 'react-native';
import React from 'react';

import {styles} from './style';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/App_Logo/logo_white.png')}
      />
    </View>
  );
};

export default SplashScreen;
