import {StyleSheet} from 'react-native';
import {Colors} from '../../config/constants/Color';
import {fontSize} from '../../config/constants/Style';
import normalize from 'react-native-normalize';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    paddingTop: normalize(80),
  },
  innerContainer: {
    marginHorizontal: normalize(20),
  },

  //----------------------------------------------------DOTS---
  dotStyle: {
    backgroundColor: Colors.borderGrey,
    height: normalize(10),
    width: normalize(10),
  },
  activeDotStyle: {
    backgroundColor: Colors.golden,
    height: normalize(10),
    width: normalize(10),
  },
  //------------------------------------------_renderItem---
  image: {
    height: normalize(280),
    width: normalize(320),
    resizeMode: 'contain',
    //tintColor: Colors.darkBlue,
    alignSelf: 'center',
  },
  detailsContainer: {
    width: normalize(250),
    alignSelf: 'center',
    marginTop: normalize(80),
  },
  title: {
    fontSize: fontSize.medium,
    color: Colors.golden,
    letterSpacing: 0,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: normalize(20),
  },
  description: {
    fontSize: fontSize.small,
    color: Colors.golden,
    letterSpacing: 0,
    textAlign: 'center',
    marginTop: normalize(20),
  },
  //------------------------------------------_renderNextButton---
  nxtBtnContainer: {
    alignItems: 'center',
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(80),
    backgroundColor: Colors.golden,
    borderRadius: normalize(15),
    alignSelf: 'center',
  },
  nxtBtnText: {
    color: Colors.darkBlue,
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
  //------------------------------------------_renderSkipButton---
  skpBtnContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(80),
  },
  skpBtnTxt: {
    color: Colors.golden,
    fontSize: fontSize.medium,
  },
  //------------------------------------------_renderDoneButton---
  dnBtnContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.golden,
    paddingVertical: normalize(15),
    paddingHorizontal: normalize(80),
    borderRadius: normalize(15),
    marginBottom: normalize(38),
  },
  dnBtnText: {
    color: Colors.darkBlue,
    fontSize: fontSize.large,
    fontWeight: 'bold',
  },
});
