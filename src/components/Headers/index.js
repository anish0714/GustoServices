import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  fontFamily,
  fontSize,
  SCREEN_HEIGHT,
} from '../../config/constants/Style';

import {Colors} from '../../config/constants/Color';

import normalize from 'react-native-normalize';
import {useNavigation} from '@react-navigation/native';

export const Header = props => {
  const navigation = useNavigation();
  // console.log(props);
  const Logo = () => {
    return (
      <View
        style={[
          styles.logoContainer,
          {marginLeft: props.auth && normalize(16)},
        ]}>
        <Image
          style={styles.logoImage}
          source={require('../../assets/App_Logo/logo_simple_white.png')}
        />
      </View>
    );
  };

  return (
    <View style={props.style ? props.style : styles.container}>
      <Logo />
      <Text style={styles.headerTitle}>{props.headerTitle}</Text>
      {!props.auth && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: Platform.OS === 'android' ? 4 : 0,
          }}>
          <TouchableOpacity
            style={{padding: normalize(10)}}
            onPress={() => navigation.navigate('feedback')}>
            <Image
              style={{
                height: normalize(22),
                width: normalize(22),
                marginTop: 2,
                tintColor: Colors.darkBlue,
              }}
              source={require('../../assets/send.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: normalize(10)}}
            onPress={() => navigation.navigate('faqs')}>
            <Image
              style={styles.icons}
              source={require('../../assets/question.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export const BackHeader = props => {
  const navigation = useNavigation();
  // console.log(props);
  const Logo = () => {
    return (
      <TouchableOpacity
        onPress={props.onClickBack}
        style={[
          styles.logoContainer,
          {marginLeft: props.auth && normalize(16)},
        ]}>
        <Image
          style={{
            height: normalize(20),
            width: normalize(10),
            tintColor: Colors.white,
          }}
          source={require('../../assets/back_button.png')}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={props.style ? props.style : styles.container}>
      <Logo />
      <Text style={styles.headerTitle}>{props.headerTitle}</Text>
      {!props.auth && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: Platform.OS === 'android' ? 4 : 0,
          }}>
          <TouchableOpacity
            style={{padding: normalize(10)}}
            onPress={() => navigation.navigate('feedback')}>
            <Image
              style={{
                height: normalize(22),
                width: normalize(22),
                marginTop: 2,
                tintColor: Colors.darkBlue,
              }}
              source={require('../../assets/send.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{padding: normalize(10)}}
            onPress={() => navigation.navigate('faqs')}>
            <Image
              style={styles.icons}
              source={require('../../assets/question.png')}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export const HeaderText = ({title}) => {
  return (
    <View style={styles.headerTextContainer}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};
export const HeaderBackArrow = ({title}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.headerBackArrowContainer}>
      <TouchableOpacity onPress={()=> navigation.goBack()}>
        <Image
          style={styles.backArrowImage}
          source={require('../../assets/back_button.png')}
        />
      </TouchableOpacity>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackArrowContainer: {
    // backgroundColor: Colors.darkBlue,
    // paddingTop: normalize(16)
  },
  backArrowImage: {
    margin: normalize(16),
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    tintColor: Colors.darkBlue,
    position: 'absolute',
  },

  headerTextContainer: {
    alignItems: 'center',
    padding: normalize(15),
    // backgroundColor: Colors.darkBlue,
    // borderBottomWidth: 1,
    // elevation: 1,
  },
  headerText: {
    color: Colors.darkBlue,
    fontSize: fontSize.medium,
    // fontWeight: 'bold'
  },

  //------------------------------------------------------------
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 0 : normalize(0),
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    paddingHorizontal: normalize(16),
  },
  logoContainer: {
    height: normalize(60),
    width: normalize(50),
    borderBottomLeftRadius: normalize(15),
    borderBottomRightRadius: normalize(15),
    backgroundColor: '#004481',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    height: normalize(25),
    width: normalize(38),
    resizeMode: 'contain',
  },
});
