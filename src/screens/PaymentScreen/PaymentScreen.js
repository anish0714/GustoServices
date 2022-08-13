import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Button,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
// constants
import {Colors} from '../../config/constants/Color';
import {fontSize, fontFamily, commonStyles} from '../../config/constants/Style';
// component
import {HeaderBackArrow} from '../../components/Headers';
import normalize, {SCREEN_HEIGHT, SCREEN_WIDTH} from 'react-native-normalize';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';
import {CreditCard, ServiceCard} from '../../components/Cards';
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
import CreditCardDisplay from 'react-native-credit-card-display';
import LinearGradient from 'react-native-linear-gradient';

const PaymentScreen = ({navigation, authReducer: {userData}}) => {
  const [cards, setCards] = useState(null);
  useEffect(() => {
    getCards(userData._id);
  }, []);
  console.log(userData._id);

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

//   console.log('cards==========>\n', cards);
  return (
    <>
    <HeaderBackArrow title="Payment Details" />
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addPaymentDetailsContainer}
        onPress={() => navigation.navigate('addPaymentDetails', [{cards}])}>
        <Image
          style={styles.addLogo}
          source={require('../../assets/add_filled.png')}
        />
        <Text style={styles.addPaymentText}>Add Card Details</Text>
      </TouchableOpacity>

      <FlatList
        //   horizontal={true}
        data={cards}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
           <CreditCard item={item}/>
          );
        }}
      />
    </View>
  </>
  );
};

PaymentScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {})(PaymentScreen);

const styles = StyleSheet.create({
 
  // ---------------
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(16),
  },
  addPaymentDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(8),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: Colors.darkBlue,
    borderBottomColor: Colors.darkBlue,
    marginTop: normalize(16),
  },
  addLogo: {
    height: normalize(16),
    width: normalize(16),
    resizeMode: 'contain',
    tintColor: Colors.darkBlue,
  },
  addPaymentText: {
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
    marginLeft: normalize(10),
  },

});
