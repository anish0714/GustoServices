import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Button,
  FlatList,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
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
// import {ServiceCard} from '../../components/Cards';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {Rating, AirbnbRating} from 'react-native-ratings';

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

const CustomerServiceDetailScreen = ({route, navigation}) => {
  const {item, userData} = route.params[0];
  const [ratingValue, setRatingValue] = useState(1);
  const [review, setReview] = useState('');
  const [ratingData, setRatingData] = useState(null);
  console.log('item\n', item);
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState('');
  const [showLogoutModel, setShowLogoutModel] = useState(false);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      const URL = `${API_URL + END_POINTS.feedbackByuserId + userData._id}/${
        item.vendorId._id
      }/${item.serviceId._id}`;
      const res = await axios.get(URL);

      if (res && res.data) {
        if (res.data.data.length > 0) {
          setRatingData(res.data.data[0]);
          setReview(res.data.data[0].review);
          //   console.log('res.data.data', res.data[0].data);
          setRatingValue(res.data.data[0].rating);
        }
      }

      //   console.log('URL', URL);
    } catch (err) {
      console.log(er);
    }
  };

  const handleSubmitReview = async () => {
    try {
      const URL = API_URL + END_POINTS.feedback;
      let PAYLOAD;
      if (ratingData) {
        PAYLOAD = {
          _id: ratingData._id,
          rating: ratingValue,
          review: review,
          userId: userData._id,
          date: new Date(),
          vendorId: item.vendorId._id,
          serviceId: item.serviceId._id,
        };
      } else {
        PAYLOAD = {
          rating: ratingValue,
          review: review,
          userId: userData._id,
          date: new Date(),
          vendorId: item.vendorId._id,
          serviceId: item.serviceId._id,
        };
      }

      console.log('PAYLOAD\n', PAYLOAD);
      const res = await axios.post(URL, PAYLOAD);
      console.log(res.data.message);
      setShowToast(true);
      setShowToastMessage(res.data.message);
      setShowLogoutModel(false);
      if (res.data.message === 'Feedback added successfully!') {
        getServiceHistory(item.vendorId._id);
        navigation.navigate('successScreen', [
          {showToastMessage: res.data.message},
        ]);
      } else {
        setShowToast(true);
        setShowToastMessage('ERROR IN API');
      }
      console.log();
    } catch (err) {
      console.log('err', err);
    }
  };
  //   console.log('REVIEW', review);
  return (
    <>
      <HeaderBackArrow title="SERVICE DETAILS" />

      <KeyboardAvoidingView style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: normalize(290),
            //   paddingTop: SCREEN_WIDTH * 0.1,
          }}>
          <View style={[styles.cardContainer]}>
            <Text style={[styles.serviceNameText]}>RATE YOUR EXPERIENCE</Text>

            <Rating
              type="custom"
              ratingCount={5}
              startingValue={ratingValue}
              imageSize={35}
              // showRating
              style={{marginTop: normalize(16)}}
              onFinishRating={value => setRatingValue(value)}
            />
          </View>

          <View
            style={{
              alignItems: 'center',
            }}>
            <InputButtonWithLabel
              borderBottom
              value={review}
              onChange={review => setReview(review)}
              labelText="Please let us know about the service"
              placeholderText="please provide some review"
              optionalStyle={styles.textInputOptionalStyle}
              optionalTextStyle={styles.serviceNameText}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => navigation.navigate('viewReceipt', [{item}])}>
              <Text style={styles.closeText}>View Receipt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => handleSubmitReview()}>
              <Text style={styles.closeText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default CustomerServiceDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  cardContainer: {
    marginHorizontal: normalize(32),
    // marginTop: normalize(24),
    paddingVertical: normalize(16),
    // borderr: normalize(10),
    // elevation: normalize(5),
    // borderWidth: 1,
    borderRadius: normalize(8),
    alignItems: 'flex-start',
  },
  serviceNameText: {
    ...commonStyles.normalboldText,
    fontSize: normalize(18),
    color: Colors.darkBlue,
    // alignSelf: 'center',
  },
  innercardContainer: {
    // paddingHorizontal: normalize(50),
    // paddingHorizontal: normalize(50),
    // paddingVertical: normalize(16),
    width: normalize(SCREEN_WIDTH * 0.4),
    // borderWidth: 1
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
    marginHorizontal: normalize(14),
    marginTop: normalize(32),
    alignSelf: 'center',
    width: normalize(SCREEN_WIDTH * 0.35),
    // position: 'absolute',
    bottom: normalize(16),
  },

  closeText: {
    ...commonStyles.normalboldText,
  },
  textInputOptionalStyle: {
    height: normalize(SCREEN_HEIGHT * 0.18),
    width: normalize(SCREEN_WIDTH * 0.76),
    borderWidth: 1,
    padding: normalize(0),
    // elevation: normalize(5)
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: normalize(24),
    position: 'absolute',
    bottom: 0,
  },
});
