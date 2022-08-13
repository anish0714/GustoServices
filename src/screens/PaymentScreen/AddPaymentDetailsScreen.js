import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
// constants
import {Colors} from '../../config/constants/Color';
import {fontSize, fontFamily, commonStyles} from '../../config/constants/Style';
// component
import {HeaderBackArrow} from '../../components/Headers';
import normalize, {SCREEN_WIDTH} from 'react-native-normalize';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';
import {ServiceCard} from '../../components/Cards';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {CloseModel} from '../../components/Models';

import CalendarStrip from 'react-native-calendar-strip';
//REDUX
import {connect} from 'react-redux';
// action
import {
  addVendorService,
  getVendorService,
  setToast,
  getServiceHistory,
} from '../../actions/vendorAction';
import {API_URL, END_POINTS} from '../../config/constants/API';
import axios from 'axios';
import {
  CreditCardInput,
  LiteCreditCardInput,
} from 'react-native-input-credit-card';

const AddPaymentDetailsScreen = ({
  route,
  navigation,
  authReducer: {userData},
}) => {
  const {cards} = route.params[0];
  //   console.log(`cards.customer: ${cards[0].customer}`);
  const [cardNumber, setCardNumber] = useState(null);
  const [cardName, setCardName] = useState(null);
  const [monthYear, setMonthYear] = useState(null);
  const [cvc, setCvc] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState('');
  const onChangeCard = form => {
    console.log(form);
    const {
      values: {cvc, expiry, name, number},
    } = form;
    setCardNumber(number);
    setCvc(cvc);
    setMonthYear(expiry);
    setCardName(name);
  };
  const handleAddCard = async () => {
    try {
      const URL = API_URL + END_POINTS.addCard;
      const expiryArr = monthYear.split('/');
      if (expiryArr[0] && expiryArr[1]) {
        let PAYLOAD = null;

        if (cards && cards.length > 0) {
          PAYLOAD = {
            cardNumber: cardNumber,
            month: expiryArr[0],
            year: expiryArr[1],
            cvc: cvc,
            email: userData.email,
            holderName: cardName,
            userId: userData._id,
            customerId: cards[0].customer,
          };
        } else {
          PAYLOAD = {
            cardNumber: cardNumber,
            month: expiryArr[0],
            year: expiryArr[1],
            cvc: cvc,
            email: userData.email,
            holderName: cardName,
            userId: userData._id,
          };
        }
        // console.log('PAYLOAD\n', PAYLOAD);
        const res = await axios.post(URL, PAYLOAD);
        console.log(res.data);
        if (res && res.data) {
          navigation.navigate('successScreen', [
            {showToastMessage: 'Card Added Successfully'},
          ]);
        }
      }
    } catch (err) {
      console.log('ERR', err);
    }
  };

  return (
    <>
      <HeaderBackArrow title="Add Card" />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView style={styles.container}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: normalize(250),
              //   paddingTop: SCREEN_WIDTH * 0.1,
            }}>
            {/* <Text>AddPaymentDetailsScreen</Text> */}
            <CreditCardInput allowScroll requiresName onChange={onChangeCard} />
            {/* <LiteCreditCardInput  onChange={onChangeCard} /> */}
            <TouchableOpacity
              style={styles.submitButtonContainer}
              onPress={handleAddCard}>
              <Text style={styles.buttonText}>Add Card</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
};

AddPaymentDetailsScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(AddPaymentDetailsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  submitButtonContainer: {
    backgroundColor: Colors.darkBlue,
    alignItems: 'center',
    padding: normalize(12),
    width: normalize(SCREEN_WIDTH * 0.8),
    alignSelf: 'center',
    borderRadius: normalize(8),
    bottom: normalize(12),
    position: 'absolute',
  },
  buttonText: {
    ...commonStyles.normalboldText,
  },
});
