import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Colors} from '../../config/constants/Color';
import {
  commonStyles,
  fontFamily,
  fontSize,
  SCREEN_WIDTH,
} from '../../config/constants/Style';
import {useNavigation} from '@react-navigation/native';
import normalize from 'react-native-normalize';

export const InputButtonWithLabel = (props) => {
    const navigation = useNavigation();
  
    return (
      <View style={styles.textInputContainer}>
        <Text
          style={{
            ...commonStyles.normalboldText,
            marginLeft: normalize(4),
            color: Colors.darkBlue,
            ...props.optionalTextStyle
          }}>
          {props.labelText}
        </Text>
        <TextInput
          style={{...styles.textInput, 
            borderWidth: props.borderBottom ? 0 : 1,
            paddingHorizontal: normalize(props.borderBottom ? 6 : 12),
            marginLeft: normalize(props.borderBottom ? 0 : 8),
            marginTop: normalize(props.borderBottom ? 0 : 12),          
            ...props.optionalStyle}}
          color={Colors.darkBlue}
          secureTextEntry={props.isPassword}
          placeholderTextColor={Colors.darkBlue}
          onChangeText={(txt) => props.onChange(txt)}
          keyboardType={props.numeric && 'number-pad'}
          maxLength={props.numeric && 10}
          placeholder={props.placeholderText}
        />
        {props.forgotPassword && (
          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => navigation.navigate('forgotPassword')}>
            <Text style={styles.forgotPasswordText}>
              Forget Password
            </Text>
          </TouchableOpacity>
        )}
        {props.isEmail && (
          <TouchableOpacity
            onPress={props.onClickVerify}
            style={{
              position: 'absolute',
              right: normalize(10),
              top: normalize(Platform.OS == 'android' ? 40 : 45),
              // borderWidth: 1,
              // marginLeft: 10
            }}>
            <Text style={{...commonStyles.normalboldText, color: Colors.red}}>
              Verify
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };


  const styles = StyleSheet.create({
    textInputContainer: {
      marginTop: normalize(24),
    },
  
    textInput: {
      height: normalize(Platform.OS == 'android' ? 36 : 45),
      width: SCREEN_WIDTH * 0.75,
      color: Colors.white,
      // marginTop: normalize(6),
      padding: Platform.OS == 'ios' ? 8 : 2,
      ...commonStyles.normalboldText,
      borderWidth: 1,
      // borderColor: Colors.borderGrey,
      backgroundColor: Colors.white,
      borderRadius: normalize(8),
      // paddingHorizontal: normalize(8),
      // marginLeft: normalize(8),
      borderColor: Colors.darkBlue,
      borderBottomWidth: 1,
    },
    
  
    textInputDesc: {
      height: normalize(Platform.OS == 'android' ? 72 : 90),
      padding: normalize(12)
    },
    lableText: {
      color: Colors.white,
      fontSize: fontSize.medium,
      fontFamily: fontFamily.semi_bold,
    },
    forgotPasswordText: {
      textAlign: 'right',
      fontSize: fontSize.small,
      color: Colors.darkBlue,
      fontWeight:'bold'
    },
    forgotPasswordContainer: {
      paddingVertical: 8,
    },
  });