import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
// constants
import {Colors} from '../../config/constants/Color';
import {
  fontSize,
  fontFamily,
  commonStyles,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../config/constants/Style';
// component
import {HeaderBackArrow} from '../../components/Headers';
import normalize from 'react-native-normalize';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';
import {ScheduleCard} from '../../components/Cards';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BottomSheetUploadImage} from '../../components/BottomSheet';

import CalendarStrip from 'react-native-calendar-strip';
//REDUX
import {connect} from 'react-redux';
// action
import {
  addVendorService,
  getVendorService,
  setToast,
} from '../../actions/vendorAction';

const SuccessScreen = ({route, navigation}) => {
  const {showToastMessage} = route.params[0];
  //   console.log(showToastMessage);
  useEffect(() => {
    setTimeout(() => {
      console.log('navigate');
      navigation.navigate('home');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('../../assets/success.png')}
      />
      <Text style={styles.textMessage}>{showToastMessage}</Text>
    </View>
  );
};

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: normalize(50),
  },
  image: {
    height: normalize(180),
    width: normalize(180),
    tintColor: Colors.white,
  },
  textMessage: {
    ...commonStyles.boldText,
    color: Colors.white,
    fontSize: normalize(25),
    marginTop: normalize(30),
  },
});
