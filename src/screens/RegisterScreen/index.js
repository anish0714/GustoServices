import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
// COMPONENTS
import {LargeButton} from '../../components/Button';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {BackHeader} from '../../components/Headers';
import {Loader} from '../../components/Loader';
//CONSTANTS
import {Colors} from '../../config/constants/Color';
import {fontFamily, fontSize, SCREEN_WIDTH} from '../../config/constants/Style';
import normalize from 'react-native-normalize';

const RegisterScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmfPassword, setConfirmPassword] = useState('');

  const validateEmail = email => {
    var isValid = /\S+@\S+\.\S+/;
    return isValid.test(email);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.root}>
        <BackHeader
          auth
          headerTitle={''}
          onClickBack={() => navigation.goBack()}
        />

        <KeyboardAvoidingView style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 50,
            //   paddingTop: SCREEN_WIDTH * 0.1,
            }}>
            <Text style={styles.signUnText}>Sign Up</Text>
            <View style={styles.subContainer}>
              <InputButtonWithLabel
                borderBottom
                onChange={name => setFullName(name)}
                labelText="Full Name"
                placeholderText="please enter your full name"
              />
              <InputButtonWithLabel
                borderBottom
                onChange={mobile => setContact(mobile)}
                numeric
                labelText="Phone No"
                placeholderText="please enter your phone number"
              />
              <InputButtonWithLabel
                borderBottom
                onChange={email => setEmail(email)}
                labelText="Email ID"
                placeholderText="please enter email id"
              />
              <InputButtonWithLabel
                borderBottom
                onChange={address => setAddress(address)}
                labelText="Address"
                placeholderText="please enter your address"
              />
              <InputButtonWithLabel
                borderBottom
                labelText="Password"
                placeholderText="please enter password"
                isPassword
                onChange={password => setPassword(password)}
              />

              <InputButtonWithLabel
                borderBottom
                labelText="Confirm Password"
                placeholderText="please enter password"
                isPassword
                onChange={cnfPassword => setConfirmPassword(cnfPassword)}
              />
              <LargeButton
                title="Submit"
                //   onClick={handleSignup}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft: SCREEN_WIDTH * 0.1,
    paddingTop: normalize(5),
  },
  signUnText: {
    fontSize: fontSize.xxl,
    color: Colors.darkBlue,
    fontFamily: fontFamily.semi_bold,
  },
  subContainer: {
    width: SCREEN_WIDTH * 0.75,
    paddingLeft: 12,
  },
});
