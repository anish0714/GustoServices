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
  SCREEN_WIDTH,
} from '../../config/constants/Style';
import {Modal} from 'react-native-paper';

export const LogoutModel = ({visible, onDismiss, onLogout}) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <View style={styles.container}>
        <View style={styles.modalHeadingContainer}>
          <Image
            source={require('../../assets/account_logout.png')}
            style={styles.logoutIcon}
          />
          <Text style={styles.heading}>LOGOUT</Text>
        </View>
        <Text style={styles.belowHeading}>Do you want to logout?</Text>
        <View style={styles.buttonContainer}>
          <ModalButton
            title="Yes"
            onPress={() => onLogout()}
            buttonStyle={styles.buttonStyle}
            textStyle={{...styles.textStyle, color: Colors.white}}
          />
          <ModalButton
            title="No"
            onPress={() => onDismiss()}
            buttonStyle={{
              ...styles.buttonStyle,
              borderColor: Colors.greyText3,
              backgroundColor: Colors.greyText3,
            }}
            textStyle={{...styles.textStyle, color: Colors.white}}
          />
        </View>
      </View>
    </Modal>
  );
};
export const CloseModel = ({visible, onDismiss, onLogout}) => {
  return (
    <Modal visible={visible} onDismiss={onDismiss}>
      <View style={styles.container}>
        <View style={styles.modalHeadingContainer}>
          <Image
            source={require('../../assets/account_logout.png')}
            style={styles.logoutIcon}
          />
          <Text style={styles.heading}>CLOSE BOOKING</Text>
        </View>
        <Text style={styles.belowHeading}>Do you want to close booking?</Text>
        <View style={styles.buttonContainer}>
          <ModalButton
            title="Yes"
            onPress={() => onLogout()}
            buttonStyle={styles.buttonStyle}
            textStyle={{...styles.textStyle, color: Colors.white}}
          />
          <ModalButton
            title="No"
            onPress={() => onDismiss()}
            buttonStyle={{
              ...styles.buttonStyle,
              borderColor: Colors.greyText3,
              backgroundColor: Colors.greyText3,
            }}
            textStyle={{...styles.textStyle, color: Colors.white}}
          />
        </View>
      </View>
    </Modal>
  );
};

const ModalButton = ({title, onPress, buttonStyle, textStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: SCREEN_WIDTH * 0.65,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 12,
    padding: normalize(16),
    zIndex: 100,
  },
  buttonStyle: {
    height: normalize(25),
    width: normalize(90),
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    backgroundColor: Colors.darkBlue,

    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginHorizontal: normalize(8),
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: normalize(10),
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    //borderColor: Colors.red,
    //borderWidth: 1
  },
  modalHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heading: {
    ...commonStyles.boldText,
    // fontSize: fontSize.large,
    fontWeight: 'bold',
    color: Colors.darkBlue,
  },
  belowHeading: {
    ...commonStyles.normalText,
    color: Colors.greyText,
    marginTop: normalize(15),
  },
  desc: {
    fontSize: fontSize.small,
    marginTop: normalize(10),
    marginLeft: normalize(10),
  },
  logoutIcon: {
    height: fontSize.extra_large,
    width: fontSize.extra_large,
    resizeMode: 'contain',
    marginRight: normalize(10),
  },
  textStyle: {
    fontSize: fontSize.small,
    color: Colors.black,
    fontFamily: fontFamily.bold,
    fontWeight: 'bold',
  },
});
