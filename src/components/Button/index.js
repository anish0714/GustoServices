import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import normalize from 'react-native-normalize';
import {Colors} from '../../config/constants/Color';
import {
  commonStyles,
  fontFamily,
  fontSize,
  PROXIMA_REGULAR,
  SCREEN_WIDTH,
} from '../../config/constants/Style';

export const LargeButton = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onClick}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    container: {
        height: normalize(50),
        backgroundColor: Colors.darkBlue,
        borderRadius: normalize(8),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
      },
      buttonText: {
        ...commonStyles.boldText,
        color: Colors.white,
      },
});
