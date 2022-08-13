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
import {HeaderText} from '../../components/Headers';
import normalize, {SCREEN_WIDTH} from 'react-native-normalize';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';
// import {ServiceCard} from '../../components/Cards';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';

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

const CustomerServiceScreen = ({
  navigation,
  getServiceHistory,
  vendorReducer: {bookingData, isLoading},
  authReducer: {userData},
}) => {
  useEffect(() => {
    getServiceHistory(userData._id);
  }, []);

  const handleOnPressCard = item => {
    if (userData.userType === 'customer') {
      navigation.navigate('customerServiceDetail', [
        {
          item,
          userData,
        },
      ]);
    } else {
      console.log('CLICKED');
    }
  };
console.log(bookingData)
  return (
    <>
      <HeaderText title="SERVICE HISTORY" />

      <View style={styles.container}>
        {bookingData ? (
          <FlatList
            data={bookingData}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <ServiceCard
                  item={item}
                  userType={userData.userType}
                  onClick={item => handleOnPressCard(item)}
                />
              );
            }}
          />
        ) : (
          <View>
            <Text>NO SERVICES ARE BOOKED</Text>
          </View>
        )}
      </View>
    </>
  );
};

const ServiceCard = ({item, userType, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => onClick(item)}>
      {/* top */}
      <View style={styles.cardTopContainer}>
        <Text style={styles.cardTopText}>{item.serviceId.name}</Text>
        <Text style={styles.cardTopText}>{item.status.toUpperCase()}</Text>
      </View>
      {/* main */}
      <View style={styles.cardMainContainer}>
        {/* <Image style={styles.cardImage} source={item.image} /> */}
        <View
          style={{
            marginLeft: normalize(10),
            flex: 1,
          }}>
          <Text style={styles.cardMainText}>
            {userType === 'customer'
              ? item.vendorId.fullName
              : item.userId.fullName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   width: '70%',
              marginTop: normalize(5),
            }}>
            <Text style={styles.cardMainText}>
              {item.selectedDate.split('T')[0]}
            </Text>
            <Text style={styles.cardMainText}>{item.selectedTime}</Text>
          </View>
          <View style={styles.cardBottomContainer}>
            <Text style={styles.cardMainText}>
              {item.paymentStatus.toUpperCase()}
            </Text>
            <Text style={styles.cardMainText}>$ {item.totalPrice}/hr</Text>
          </View>
        </View>
      </View>
      {/* bottom */}
    </TouchableOpacity>
  );
};

CustomerServiceScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
  vendorReducer: PropTypes.object.isRequired,

  getServiceHistory: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
  vendorReducer: state.vendorReducer,
});

export default connect(mapStateToProps, {getServiceHistory})(
  CustomerServiceScreen,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  //---------------CARD-----------
  cardImage: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(50),
  },
  cardMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: normalize(10),
    // flex:1,
    // borderWidth: 1,
  },
  cardContainer: {
    // padding: normalize(8),
    marginHorizontal: normalize(32),
    marginVertical: normalize(8),
    elevation: normalize(5),
    // borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: normalize(10),
  },
  cardTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.darkBlue,
    padding: normalize(10),
    borderTopLeftRadius: normalize(7),
    borderTopRightRadius: normalize(7),
  },
  cardTopText: {
    color: Colors.white,
    fontSize: fontSize.small,
  },
  cardMainText: {
    color: Colors.darkBlue,
    fontSize: fontSize.small,
  },
  cardBottomContainer: {
    // paddingHorizontal: normalize(10),
    // paddingBottom: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
