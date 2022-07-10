import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
// react-native api
import {
  View,
  Text,
  Alert,
  BackHandler,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
// screens
import SplashScreen from './src/screens/SplashScreen';
import RootNavigator from './src/router';
import OnBoardingScreen from './src/screens/OnBoardingScreen.js';
// colors
import {Colors} from './src/config/constants/Color';
// redux
import {connect} from 'react-redux';

const MainApp = ({
  isSplashLoading,
  authReducer: {isAppIntroSlider},
}) => {
  

  useEffect(() => {
    // Add event listener for hardware back button press on Android
    BackHandler.addEventListener('hardwareBackPress', backButtonHandler);

    return () =>
      // clear/remove event listener
      BackHandler.removeEventListener('hardwareBackPress', backButtonHandler);
  }, []);

  const backButtonHandler = () => {
    Alert.alert('Alert!', 'Do you want to exit app?', [
      {
        text: 'YES',
        onPress: () => BackHandler.exitApp(),
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
    ]);

    return true;
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSplashLoading ? (
        <SplashScreen />
      ) : isAppIntroSlider ? (
        <OnBoardingScreen />
      ) : (
        <RootNavigator />
      )}
    </SafeAreaView>
  );
};

MainApp.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(MainApp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   backgroundColor: Colors.black,
  },
});
