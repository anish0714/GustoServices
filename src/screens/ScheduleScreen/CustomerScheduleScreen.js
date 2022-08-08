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
// api
import {API_URL, LOCALHOST, END_POINTS} from '../../config/constants/API';
import axios from 'axios';

import CalendarStrip from 'react-native-calendar-strip';
import {connect} from 'react-redux';

// -------------------------------------------------
const CustomerScheduleScreen = ({route, authReducer: {userData}}) => {
  const {item} = route.params[0];
  //   console.log('ITEM\n', item);
  //--------DATE

  const [scheduleTimings, setScheduleTimings] = useState(null);
  const [serviceSchedule, serServiceSchedule] = useState(item.schedule);
  const [selectedScheduledDate, setSelectedScheduledDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showToast, setShowToast] = useState(false);
  const [showToastMessage, setShowToastMessage] = useState('');
  const handleSelectedDate = date => {
    // console.log('DATE = ', date);
    setSelectedDate(date);
    setTiming(date);
  };

  useEffect(() => {
    setTiming(selectedDate);
  }, []);

  const setTiming = date => {
    let data = null;
    if (serviceSchedule) {
      data = serviceSchedule.filter(
        schedule =>
          JSON.stringify(schedule.date).split('T')[0] ===
          JSON.stringify(date).split('T')[0],
      )[0];
    }
    // console.log('data', data);

    if (data) {
      setScheduleTimings(data.timings);
    } else {
      setScheduleTimings(null);
    }
  };

  const handleSchedule = item => {
    let schedule = scheduleTimings.filter(
      schedule => schedule._id !== item._id,
    );

    schedule.forEach(element => {
      if (element.status === 'unavailable') {
        element.status = 'unavailable';
      } else if (element.status === 'booked') {
        element.status = 'booked';
      } else {
        element.status = 'available';
      }
    });

    item.status = 'selected';

    schedule.push(item);
    schedule = schedule.sort(function (a, b) {
      return a.id - b.id;
    });
    setScheduleTimings(schedule);
  };

  const handleBookService = async () => {
    let data = null;
    if (scheduleTimings) {
      data = scheduleTimings.filter(
        schedule => schedule.status === 'selected',
      )[0];
    }
    if (!data) {
      setShowToast(true);
      setShowToastMessage('Please select date and time slot');
    } else {
      const URL = API_URL + END_POINTS.addBooking;
      const PAYLOAD = {
        totalPrice: item.rate,
        userId: userData._id,
        selectedDate: selectedDate,
        selectedTime: data.time,
        serviceId: item.serviceId,
        vendorId: item.vendorId._id,
      };
      //   console.log(`rate : ${item.rate}, vendor id: ${item.vendorId._id}`);
      //   console.log('selectedDate,', selectedDate);
      //   console.log('useddata,', userData._id);
      try {
        const res = await axios.post(URL, PAYLOAD);
        console.log('res.data', res.data);
        setShowToast(true);
        if (res.data) {
          setShowToastMessage(res.data.message);
        } else {
          setShowToastMessage('SERVER ERROR');
        }
      } catch (err) {
        console.log('ERROR', err);
        setShowToast(true);
        setShowToastMessage('SERVER DOWN');
      }
    }
  };

  return (
    <>
      <HeaderBackArrow title={item.serviceName} />
      <View style={styles.container}>
        <Text style={styles.selectDateText}>Select Date</Text>
        <CalendarStrip
          scrollable
          calendarAnimation={{type: 'sequence', duration: 0}}
          style={styles.calenderStrip}
          calendarColor={Colors.lightergrey}
          // calendarHeaderStyle={{marginVertical: 8}}
          dateNumberStyle={{color: Colors.greyText}}
          dateNameStyle={{color: 'black'}}
          highlightDateNumberStyle={{color: Colors.white}}
          highlightDateNameStyle={{color: Colors.white}}
          disabledDateNameStyle={{color: 'grey'}}
          disabledDateNumberStyle={{color: 'grey'}}
          selectedDate={selectedDate}
          onDateSelected={newDate => handleSelectedDate(newDate)}
          highlightDateNumberContainerStyle={{backgroundColor: Colors.darkBlue}}
          highlightDateContainerStyle={{backgroundColor: Colors.darkBlue}}
          iconContainer={{
            height: normalize(50),
            width: normalize(15),
            backgroundColor: Colors.darkBlue,
          }}
          iconLeft={require('../../assets/calendar-left-arrow.png')}
          iconRight={require('../../assets/calendar-right-arrow.png')}
        />

        <View style={{marginTop: normalize(16), alignSelf: 'center'}}>
          <Text style={styles.selectTimeText}>Select Time</Text>
          {scheduleTimings ? (
            <FlatList
              // horizontal={true}
              // showsHorizontalScrollIndicator={false}
              numColumns={3}
              data={scheduleTimings}
              keyExtractor={item => item.id}
              renderItem={({item, index}) => {
                return (
                  <CustomerScheduleCard
                    item={item}
                    onClick={item => handleSchedule(item)}
                  />
                );
              }}
            />
          ) : (
            <View>
              <Text>Schedule is booked for the current date</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.editServiceButton}
          onPress={handleBookService}>
          <Text style={styles.editServiceText}>Book Service</Text>
        </TouchableOpacity>
      </View>
      {showToast && (
        <ShowToast
          onDismiss={() => setShowToast(false)}
          visible={showToast}
          message={showToastMessage}
        />
      )}
    </>
  );
};

CustomerScheduleScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(CustomerScheduleScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(16),
  },
  selectDateText: {
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
    // marginLeft: normalize(12),
    marginTop: normalize(16),
    marginBottom: normalize(16),
    alignSelf: 'center',
  },
  selectTimeText: {
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
    // marginLeft: normalize(12),
    marginTop: normalize(8),
    marginBottom: normalize(16),
    alignSelf: 'center',
  },
  calenderStrip: {
    height: normalize(80),
    backgroundColor: Colors.lightergrey,
    // borderTopLeftRadius: normalize(8),
    // borderTopRightRadius: normalize(8),
    borderRadius: normalize(8),
    // borderWidth: 1,
    // elevation: normalize(5),
  },
  editServiceButton: {
    backgroundColor: Colors.darkBlue,
    position: 'absolute',
    alignSelf: 'center',
    width: SCREEN_WIDTH - 32,
    alignItems: 'center',
    bottom: normalize(16),
    padding: normalize(12),
    borderRadius: normalize(8),
  },
  editServiceText: {
    ...commonStyles.normalboldText,
  },
});
