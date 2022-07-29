import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {HeaderText, HeaderBackArrow} from '../../components/Headers';

// colors
import {Colors} from '../../config/constants/Color';
import {
  commonStyles,
  fontFamily,
  fontSize,
  SCREEN_WIDTH,
} from '../../config/constants/Style';
import normalize from 'react-native-normalize';

// COMPONENTS
import {LargeButton} from '../../components/Button';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {BackHeader} from '../../components/Headers';
import {Loader} from '../../components/Loader';
import {BottomSheet} from '../../components/BottomSheet';
import {ShowToast} from '../../components/Toast';

// redux
import {connect} from 'react-redux';
import { add } from 'react-native-reanimated';

const EditScreen = ({authReducer: {userData}}) => {
  const [fullName, setFullName] = useState(userData.fullName);
  const [email, setEmail] = useState(userData.email);
  const [contact, setContact] = useState(userData.contactNumber);
  const [address, setAddress] = useState(userData.address);
  const [postalCode, setPostalCode] = useState(userData.postalCode);
  const [city, setCity] = useState(userData.city);
  const [bio, setBio] = useState(userData.bio);
  const [organizationName, setOrganizationName] = useState(userData.organizationName);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.root}>
          <HeaderBackArrow title="EDIT PROFILE" />
          <KeyboardAvoidingView style={styles.container}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: 50,
                //   paddingTop: SCREEN_WIDTH * 0.1,
              }}>
              <View style={styles.subContainer}>
                <InputButtonWithLabel
                  borderBottom
                  onChange={name => setFullName(name)}
                  labelText="Full Name"
                  value={fullName}
                  placeholderText="please enter your full name"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={mobile => setContact(mobile)}
                  numeric
                  value={contact}
                  labelText="Phone No"
                  placeholderText="please enter your phone number"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={email => setEmail(email)}
                  value={email}
                  labelText="Email ID"
                  placeholderText="please enter email id"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={address => setAddress(address)}
                  value={address}
                  labelText="Address"
                  placeholderText="please enter your address"
                />
                <InputButtonWithLabel
                  style={{width: normalize(20)}}
                  borderBottom
                  onChange={city => setCity(city)}
                  labelText="City"
                  value={city}
                  placeholderText="please enter your city"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={postalCode => setPostalCode(postalCode)}
                  labelText="Postal Code"
                  value={postalCode}
                  placeholderText="please enter your postal code"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={bio => setBio(bio)}
                  labelText="Bio"
                  value={bio}
                  placeholderText="please enter your bio"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={organizationName =>
                    setOrganizationName(organizationName)
                  }
                  value={organizationName}
                  labelText="Organization Name"
                  placeholderText="please enter your organization name"
                />

                <LargeButton
                  title="Submit"
                  // onClick={validateRegister}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

EditScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {})(EditScreen);

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
  subContainer: {
    width: SCREEN_WIDTH * 0.75,
    paddingLeft: normalize(12),
  },
});
