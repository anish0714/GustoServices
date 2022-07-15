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

const EditScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [bio, setBio] = useState('');
  const [organizationName, setOrganizationName] = useState('');
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
                  style={{width: normalize(20)}}
                  borderBottom
                  onChange={city => setCity(city)}
                  labelText="City"
                  placeholderText="please enter your city"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={postalCode => setPostalCode(postalCode)}
                  labelText="Postal Code"
                  placeholderText="please enter your postal code"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={bio => setBio(bio)}
                  labelText="Bio"
                  placeholderText="please enter your bio"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={organizationName =>
                    setOrganizationName(organizationName)
                  }
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

export default EditScreen;

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
