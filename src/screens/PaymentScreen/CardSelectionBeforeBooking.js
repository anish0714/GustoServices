import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
  FlatList,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {CustomerScheduleCard} from '../../components/Cards';

// components
import {HeaderBackArrow, HeaderText} from '../../components/Headers';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {BottomSheetUploadImage} from '../../components/BottomSheet';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {CreditCard} from '../../components/Cards';
// constants
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import normalize from 'react-native-normalize';
import {Colors} from '../../config/constants/Color';
import {
  fontSize,
  commonStyles,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../config/constants/Style';
// api
import {API_URL, LOCALHOST, END_POINTS} from '../../config/constants/API';
import axios from 'axios';

import CalendarStrip from 'react-native-calendar-strip';
import {connect} from 'react-redux';

//
const CardSelectionBeforeBooking = ({
  navigation,
  route,
  authReducer: {userData},
}) => {
  const {PAYLOAD, bookingData} = route.params[0];
  const [cards, setCards] = useState(null);
  //   conse[(selectedCard, setSelectedCard)] = useState(null);
  console.log('BOOKING DATA >>>>>>\n', PAYLOAD);
  useEffect(() => {
    getCards(userData._id);
  }, []);
  const getCards = async userId => {
    try {
      const URL = API_URL + END_POINTS.payment + userId;
      const res = await axios.get(URL);
      console.log('RES =========>\n', res.data.data.data);
      if (res && res.data) {
        setCards(res.data.data.data);
      } else {
        setCards(null);
      }
    } catch (err) {
      console.log('Err', err);
    }
  };
  //--------------------------------------HANDLE PAYMENT
  const handlePayment = async cardData => {
    try {
      //   console.log(cardData);
      const URL = API_URL + END_POINTS.acceptPayment;
      const PAYLOAD_DATA = {
        amount: bookingData.data.totalPrice * 100,
        description: 'Payment for service',
        customerId: cardData.customer,
        cardId: cardData.id,
        bookingId: bookingData.data._id,
      };
      
      const res = await axios.post(URL, PAYLOAD_DATA);
      if (res) {
        console.log(res.data);
        navigation.navigate('successScreen', [
          {showToastMessage: 'Booking placed successfully!'},
        ]);
      }
    } catch (err) {
      console.log('ERR', err);
    }
  };

  return (
    <>
      <HeaderBackArrow title="SELECT CARD" />
      <View style={styles.container}>
        <Text style={styles.headerText}>Select a card for payment</Text>
        {cards ? (
          <FlatList
            //   horizontal={true}
            data={cards}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <CreditCard item={item} onClick={item => handlePayment(item)} />
              );
            }}
          />
        ) : (
          <View>
            <Text>Please add a payment method</Text>
          </View>
        )}
      </View>
    </>
  );
};
CardSelectionBeforeBooking.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {})(CardSelectionBeforeBooking);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerText: {
    alignSelf: 'center',
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
    fontSize: fontSize.medium,
  },
});
