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
const ServiceDetailScreen = ({route, getServiceHistory, navigation}) => {
  const {item} = route.params[0];

  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState('');
  const [showLogoutModel, setShowLogoutModel] = useState(false);
  const handleCloseBooking = async () => {
    try {
      const URL = API_URL + END_POINTS.closeBooking + item._id;
      const res = await axios.put(URL);
      console.log(res.data.message);
      setShowToast(true);
      setShowToastMessage(res.data.message);
      setShowLogoutModel(false);
      if (res.data.message === 'Booking closed successfully!') {
        getServiceHistory(item.vendorId._id);
        navigation.navigate('successScreen', [
          {showToastMessage: res.data.message},
        ]);
      } else {
        setShowToast(true);
        setShowToastMessage('ERROR IN API');
      }
    } catch (err) {
      console.log('ERR', err);
    }
  };
  console.log(
    `showToastMessage: ${showToastMessage} , showToast: ${showToast}`,
  );
  return (
    <>
      <HeaderBackArrow title="SERVICE DETAILS" />
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Text style={styles.serviceNameText}>{item.serviceId.name}</Text>
          <View style={styles.innercardContainer}>
            <View style={styles.innerGrid}>
              <Text style={styles.gridText}>Customer Name:</Text>
              <Text style={styles.gridText}>{item.userId.fullName}</Text>
            </View>
            <View style={styles.innerGrid}>
              <Text style={styles.gridText}>Date:</Text>
              <Text style={styles.gridText}>
                {item.selectedDate.split('T')[0]}
              </Text>
            </View>
            <View style={styles.innerGrid}>
              <Text style={styles.gridText}>Time:</Text>
              <Text style={styles.gridText}>{item.selectedTime}</Text>
            </View>
            <View style={styles.innerGrid}>
              <Text style={styles.gridText}>Rate:</Text>
              <Text style={styles.gridText}>${item.totalPrice}/hr</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setShowLogoutModel(true)}>
            <Text style={styles.closeText}>Close Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CloseModel
        // onLogout={() => console.log('onlogout pressed')}
        onLogout={handleCloseBooking}
        visible={showLogoutModel}
        onDismiss={() => setShowLogoutModel(false)}
      />
    </>
  );
};

ServiceDetailScreen.prototypes = {
  getServiceHistory: PropTypes.func.isRequired,
};
export default connect(null, {getServiceHistory})(ServiceDetailScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cardContainer: {
    marginHorizontal: normalize(32),
    marginTop: normalize(16),
    paddingVertical: normalize(16),
    // borderr: normalize(10),
    elevation: normalize(5),
    // borderWidth: 1,
    borderRadius: normalize(8),
  },
  serviceNameText: {
    ...commonStyles.normalboldText,
    fontSize: normalize(24),
    color: Colors.darkBlue,
    alignSelf: 'center',
  },
  innercardContainer: {
    paddingHorizontal: normalize(50),
    paddingVertical: normalize(16),
  },

  innerGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridText: {
    ...commonStyles.normalText,
    color: Colors.darkBlue,
    fontSize: normalize(16),
    marginVertical: normalize(8),
  },
  buttonContainer: {
    backgroundColor: Colors.darkBlue,
    padding: normalize(10),
    alignItems: 'center',
    borderRadius: normalize(8),
    marginHorizontal: normalize(40),
    marginTop: normalize(8),
  },
  closeText: {
    ...commonStyles.normalboldText,
  },
});
