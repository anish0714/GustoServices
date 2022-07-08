import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
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
import {BottomSheet} from '../../components/BottomSheet';
//CONSTANTS
import {Colors} from '../../config/constants/Color';
import {
  commonStyles,
  fontFamily,
  fontSize,
  SCREEN_WIDTH,
} from '../../config/constants/Style';
import normalize from 'react-native-normalize';

//Actions
import {handleRegister} from '../../actions/authAction';
//proptypes
import PropTypes from 'prop-types';
//REDUX
import {connect} from 'react-redux';

const RegisterScreen = ({navigation, authReducer, handleRegister}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmfPassword, setConfirmPassword] = useState('');
  const [type, setType] = useState('customer');
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState('');

  const refCustVendorBottomSheet = useRef(null);

  const validateEmail = email => {
    var isValid = /\S+@\S+\.\S+/;
    return isValid.test(email);
  };

  const validateRegister = () => {
    if (
      email.trim().length < 1 ||
      fullName.trim().length < 1 ||
      contact.trim().length < 1 ||
      password.trim().length < 1 ||
      address.trim().length < 1 ||
      confirmfPassword.trim().length < 1 ||
      type.trim().length < 1
    ) {
      setToastMessage('Please fill all the details');
      setShowToast(true);
    } else if (!validateEmail(email)) {
      setToastMessage('pleasee enter valid a email id');
      setShowToast(true);
    } else if (password !== confirmfPassword) {
      setToastMessage("password and confirm password doesn't match");
      setShowToast(true);
    } else if (password.length < 6 || password.length > 15) {
      setToastMessage('password length should be more than 6');
      setShowToast(true);
    } else {
      let payload = {
        fullName: fullName,
        email: email,
        password: password,
        contactNumber: contact,
        address,
        userType: type,
      };
      handleRegister(payload);
    }
  };

  return (
    <>
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

                <View style={styles.typeContainer}>
                  <Text style={styles.typeText}>Type</Text>
                  <TouchableOpacity
                    onPress={() => refCustVendorBottomSheet.current.open()}
                    style={styles.typeSelector}>
                    <Text style={styles.typeText}>{type}</Text>
                    <Image
                      style={styles.dropDownImage}
                      source={require('../../assets/drop_down_icon.png')}
                    />
                  </TouchableOpacity>
                </View>

                <LargeButton title="Submit" onClick={validateRegister} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
      <BottomSheet
        refRBSheet={refCustVendorBottomSheet}
        setCustomer={() => {
          refCustVendorBottomSheet.current.close();
          setType('customer');
        }}
        setVendor={() => {
          refCustVendorBottomSheet.current.close();
          setType('vendor');
        }}
      />
    </>
  );
};

RegisterScreen.prototypes = {
  handleRegister: PropTypes.func.isRequired,
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {handleRegister})(RegisterScreen);

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
    paddingLeft: normalize(12),
  },
  typeText: {
    ...commonStyles.normalboldText,
    marginLeft: normalize(4),
    color: Colors.darkBlue,
  },
  typeContainer: {
    marginTop: normalize(20),
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeSelector: {
    borderWidth: 1,
    width: normalize(100),
    padding: normalize(5),
    borderColor: Colors.darkBlue,
    borderRadius: normalize(7),
    marginLeft: normalize(20),
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropDownImage: {
    tintColor: Colors.darkBlue,
    height: normalize(9),
    resizeMode: 'contain',
  },
});
