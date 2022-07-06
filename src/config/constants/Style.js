import {Dimensions, Platform} from 'react-native';
import normalize from 'react-native-normalize';
import {Colors} from '../constants/Color'

// SCREEN HEIGHT AND WIDTH
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const fontFamily = {
  bold: Platform.OS === 'android' ? 'Proxima Nova Alt Bold' : null,
  semi_bold: Platform.OS === 'android' ? 'Proxima Nova Alt Semibold' : null,
  medium: Platform.OS === 'android' ? 'ProximaNova-Medium' : null,
};

export const fontSize = {
  extra_small: Platform.OS === 'android' ? normalize(8) : normalize(6),
  small: normalize(Platform.OS === 'android' ? 12 : 10),
  medium: normalize(Platform.OS === 'android' ? 16 : 14),
  large: normalize(Platform.OS === 'android' ? 18 : 16),
  extra_large: normalize(Platform.OS === 'android' ? 20 : 18),
  xxl: normalize(32),
};

export const commonStyles = {
  boldText: {
    fontSize: fontSize.medium,
    color: Colors.white,
    fontFamily: fontFamily.bold,
    fontWeight: 'bold',
  },

  smallText: {
    fontSize: fontSize.extra_small,
    color: Colors.white,
    fontFamily: fontFamily.semi_bold,
  },
  normalText: {
    fontSize: fontSize.small,
    color: Colors.white,
    fontFamily: fontFamily.semi_bold,
  },
  normalboldText: {
    fontSize: fontSize.small,
    color: Colors.white,
    fontFamily: fontFamily.bold,
    fontWeight: 'bold',
    // marginLeft: Platform.OS === 'ios' ? 4 : 16,
  },
  smallboldText: {
    fontSize: normalize(Platform.OS === 'android' ? 8 : 6),
    color: Colors.white,
    fontFamily: fontFamily.bold,
    fontWeight: 'bold',
    // marginLeft: Platform.OS === 'ios' ? 4 : 16,
  },
};
