import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';

import normalize from 'react-native-normalize';

//COMPONENTS
import {Header} from '../../components/Headers';
import {Loader} from '../../components/Loader';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';
import {ShowToast} from '../../components/Toast';
//CONSTANTS
import {Colors} from '../../config/constants/Color';
import {fontFamily, fontSize, SCREEN_WIDTH} from '../../config/constants/Style';
// actions
import {setToast, handleLogin} from '../../actions/authAction';
//REDUX
import {connect} from 'react-redux';

const LoginScreen = ({
  navigation,
  setToast,
  handleLogin,
  authReducer: {isLoading, isShowToast, showToastMessage},
}) => {
  //-----------------------------------------------------use State---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Header auth />
      <Loader isLoading={isLoading} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <Text style={styles.signInText}>Sign In</Text>
          <View style={styles.subContainer}>
            <InputButtonWithLabel
              borderBottom
              onChange={email => setEmail(email)}
              placeholderText="enter email"
              labelText="Email"
              // borderBottom
            />
            <InputButtonWithLabel
              borderBottom
              labelText="Password"
              placeholderText="please enter password"
              isPassword
              // forgotPassword
              forgotPasswordText="Forget Password"
              onChange={password => setPassword(password)}
            />

            <LargeButton
              title="Submit"
              onClick={() => {
                // console.log(email, password);
                handleLogin(email, password);
              }}
            />

            <View style={styles.lowerTextContainer}>
              <Text style={styles.lowerText}>Don't have an account</Text>
              <TouchableOpacity
                style={styles.signUpContainer}
                onPress={() => navigation.navigate('register')}>
                <Text style={styles.signuptext}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isShowToast && (
        <ShowToast
          onDismiss={() => setToast()}
          visible={isShowToast}
          message={showToastMessage}
        />
      )}
    </>
  );
};

LoginScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
  setToast: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {setToast, handleLogin})(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingLeft: SCREEN_WIDTH * 0.1,
    paddingTop: SCREEN_WIDTH * 0.1,
  },
  signInText: {
    fontSize: fontSize.xxl,
    color: Colors.darkBlue,
    fontFamily: fontFamily.semi_bold,
  },
  subContainer: {
    width: SCREEN_WIDTH * 0.75,
    paddingLeft: 12,
  },
  lowerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(16),
  },
  lowerText: {
    color: Colors.darkBlue,
  },
  signUpContainer: {
    justifyContent: 'center',
  },
  signuptext: {
    color: Colors.darkBlue,
    marginLeft: normalize(5),
    fontWeight: 'bold',
  },
});
