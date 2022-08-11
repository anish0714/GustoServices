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
// components
import {HeaderBackArrow, HeaderText} from '../../components/Headers';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {BottomSheetUploadImage} from '../../components/BottomSheet';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {FeedbackCard} from '../../components/Cards';
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
import {decode as atob, encode as btoa} from 'base-64';
// api
import {API_URL, LOCALHOST, END_POINTS} from '../../config/constants/API';
import axios from 'axios';
const BookServiceScreen = ({route, navigation}) => {
  const {item} = route.params[0];
  console.log('item', item);
  const [feedbackData, setFeedbackData] = useState(null);
  useEffect(() => {
    getFeedback(item.vendorId._id, item.serviceId);
  }, []);

  const getFeedback = async (vId, sId) => {
    console.log(`${vId}, ${sId}`);
    const URL = `${API_URL + END_POINTS.feedback}/${vId}/${sId}`;
    console.log(URL);
    const res = await axios.get(URL);
    console.log('res.data', res.data);
    setFeedbackData(res.data.data);
  };

  return (
    <>
      <HeaderBackArrow title={item.serviceName} />
      <View style={styles.container}>
        <View style={styles.upperContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                resizeMode: 'contain',
                borderRadius: normalize(50),
              }}
              source={require('../../assets/profile_image.png')}
            />
          </View>
          <View style={styles.headingContainer}>
            <Text style={styles.orgNameTxt}>
              {item.organizationName.toUpperCase()}
            </Text>
            <Text style={styles.locationText}>
              {item &&
                item.location.charAt(0).toUpperCase() + item.location.slice(1)}
            </Text>
            {/* <Text>BIO</Text> */}
          </View>
        </View>
        <View style={styles.aboutHimContainer}>
          <Text style={styles.orgNameTxt}>About Him</Text>
          <Text style={styles.locationText}>{item.bio}</Text>
        </View>
        <Text style={styles.reviewText}>Reviews</Text>
        {feedbackData?.length > 0 ? (
          <FlatList
            data={feedbackData}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <FeedbackCard
                  item={item}
                  // onClick
                />
              );
            }}
          />
        ) : (
          <View style={styles.noReview}>
            <Text style={styles.noReviewText}>No Reviews</Text>
          </View>
        )}
        <View style={styles.bottomContainer}>
          <Text numberOfLines={1} style={styles.rateText}>
            ${item.rate}/hr.
          </Text>
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('customerSchedule', [{item}])}>
            <Text style={styles.scheduleText}>Schedule</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default BookServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  reviewText: {
    ...commonStyles.boldText,
    color: Colors.darkBlue,
    marginLeft: normalize(32),
    marginBottom: normalize(16),
  },
  upperContainer: {
    marginHorizontal: normalize(32),
    flexDirection: 'row',
    marginTop: normalize(16),
  },
  imageContainer: {
    height: normalize(80),
    width: normalize(80),
    borderRadius: normalize(100),
    elevation: normalize(10),
    backgroundColor: Colors.white,
    // borderWidth: 1,
  },
  headingContainer: {
    marginLeft: normalize(16),
    marginTop: normalize(16),
  },
  aboutHimContainer: {
    marginLeft: normalize(32),
    marginTop: normalize(8),
    marginBottom: normalize(8),
  },
  bottomContainer: {
    position: 'absolute',
    bottom: normalize(0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: normalize(32),
    paddingVertical: normalize(12),
    paddingLeft: normalize(14),
    alignItems: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    width: normalize(SCREEN_WIDTH / 1.8),
    padding: normalize(10),
    borderRadius: normalize(8),
  },
  rateText: {
    ...commonStyles.boldText,
    color: Colors.darkBlue,
    width: normalize(SCREEN_WIDTH / 5),
  },
  scheduleText: {
    ...commonStyles.boldText,
  },
  noReview: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalize(SCREEN_HEIGHT / 3),
  },
  noReviewText: {
    fontSize: normalize(24),
  },
  orgNameTxt: {
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
    // textDecorationStyle: 'dotted'
  },
  locationText: {
    ...commonStyles.normalText,
    color: Colors.darkBlue,
    // textDecorationStyle: 'dotted'
  },
});
