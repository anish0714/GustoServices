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
import {PaymentModel} from '../../components/Models';

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
import {getServiceHistory} from '../../actions/vendorAction';
//
const CardSelectionBeforeBooking = ({
  navigation,
  route,
  getServiceHistory,
  authReducer: {userData},
}) => {
  const {PAYLOAD, bookingData} = route.params[0];
  const [cards, setCards] = useState(null);
  const [showLogoutModel, setShowLogoutModel] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
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
    console.log('CLICKED ON LOGOUT');
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
        getServiceHistory(userData._id);
        navigation.navigate('successScreen', [
          {showToastMessage: 'Booking placed successfully!'},
        ]);
      }
    } catch (err) {
      console.log('ERR', err);
    }
  };

  const handleCardSelection = cardDetails => {
    setSelectedCard(cardDetails);
    setShowLogoutModel(true);
  };

  return (
    <>
      <HeaderBackArrow title="Select Card" />
      <View style={styles.container}>
        <Text style={styles.headerText}>Select a card for payment</Text>
        {cards ? (
          <FlatList
            //   horizontal={true}
            data={cards}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <CreditCard
                  item={item}
                  onClick={item => handleCardSelection(item)}
                />
              );
            }}
          />
        ) : (
          <View>
            <Text>Please add a payment method</Text>
          </View>
        )}
      </View>
      <PaymentModel
        // onLogout={() => console.log('onlogout pressed')}
        onLogout={() => handlePayment(selectedCard)}
        visible={showLogoutModel}
        onDismiss={() => setShowLogoutModel(false)}
      />
    </>
  );
};
CardSelectionBeforeBooking.prototypes = {
  authReducer: PropTypes.object.isRequired,
  getServiceHistory: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {getServiceHistory})(
  CardSelectionBeforeBooking,
);

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
