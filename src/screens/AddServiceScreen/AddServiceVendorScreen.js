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
import {ScheduleCard} from '../../components/Cards';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
//
import DateTimePicker from '@react-native-community/datetimepicker';

import CalendarStrip from 'react-native-calendar-strip';

// API
import {API_URL, END_POINTS} from '../../config/constants/API';
import axios from 'axios';
//REDUX
import {connect} from 'react-redux';

const AddServiceVendorScreen = ({route, authReducer: {userData}}) => {
  const {SelectedServiceItem} = route.params[0];
  console.log('$$$$$$$ITEMS', SelectedServiceItem);
  const [rate, setRate] = useState(0);
  const [serviceName, setServiceName] = useState('');
  const [scheduleTime, setScheduleTime] = useState([
    {
      id: '0',
      time: '10:00 AM',
      status: 'unavailable',
    },
    {
      id: '1',
      time: '11:00 AM',
      status: 'unavailable',
    },
    {
      id: '2',
      time: '12:00 PM',
      status: 'unavailable',
    },
    {
      id: '3',
      time: '01:00 PM',
      status: 'unavailable',
    },
    {
      id: '4',
      time: '02:00 PM',
      status: 'unavailable',
    },
    {
      id: '5',
      time: '03:00 PM',
      status: 'unavailable',
    },
    {
      id: '6',
      time: '04:00 PM',
      status: 'unavailable',
    },
    {
      id: '7',
      time: '05:00 PM',
      status: 'unavailable',
    },
    {
      id: '8',
      time: '06:00 PM',
      status: 'unavailable',
    },
  ]);
  console.log('RATE: ', rate);
  const handleSchedule = (item, index) => {
    let schedule = scheduleTime.filter(schedule => schedule.id !== item.id);
    if (item.status === 'available') {
      item.status = 'unavailable';
    } else {
      item.status = 'available';
    }

    schedule.push(item);
    schedule = schedule.sort(function (a, b) {
      return a.id - b.id;
    });
    // console.log('scheduleTime ==>', schedule);

    setScheduleTime(schedule);
  };

  // console.log('scheduleTime ==>', scheduleTime);

  //--------DATE

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleSelectedDate = date => {
    setSelectedDate(date);
  };
  // console.log('selectedDate', selectedDate);

  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (!serviceName) {
        setShowToast(true);
        setToastMessage('Please enter service name');
      } else if (!rate || rate === 0) {
        setShowToast(true);
        setToastMessage('Please enter rate');
      } else {
        const URL = API_URL + END_POINTS.addVendorService;
        const PAYLOAD = {
          serviceName: serviceName,
          serviceId: SelectedServiceItem._id,
          vendorId: userData._id,
          rate: rate,
          schedule: [
            {
              date: selectedDate,
              timings: scheduleTime,
            },
          ],
        };
        const res = await axios.post(URL, PAYLOAD);
        if (res) {
          console.log('RESPONSE ==>\n', res.data);

          setShowToast(true);
          setToastMessage(res.data.message);
        } else {
          setShowToast(true);
          setToastMessage('SERVER ERROR');
        }
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      <Loader isLoading={loading} />
      <HeaderBackArrow title={`${SelectedServiceItem.name}`} />
      <View style={styles.container}>
        <View style={{alignSelf: 'center'}}>
          <InputButtonWithLabel
            borderBottom
            onChange={serviceName => setServiceName(serviceName)}
            labelText="Service Name"
            placeholderText="please add service name"
          />

          <InputButtonWithLabel
            borderBottom
            onChange={rate => setRate(rate)}
            numeric
            labelText="Rate"
            placeholderText="please add rate"
          />
        </View>

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
          iconLeft={require('../../assets/calendar-right-arrow.png')}
          iconRight={require('../../assets/calendar-right-arrow.png')}
        />
        <View style={{marginTop: normalize(16), alignSelf: 'center'}}>
          <Text style={styles.selectTimeText}>Select Time</Text>
          <FlatList
            // horizontal={true}
            // showsHorizontalScrollIndicator={false}
            numColumns={3}
            data={scheduleTime}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <ScheduleCard
                  item={item}
                  index={index}
                  onClick={(item, index) => handleSchedule(item, index)}
                />
              );
            }}
          />
        </View>

        <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit}>
          <Text style={styles.submitText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
      {showToast && (
        <ShowToast
          onDismiss={() => setShowToast(false)}
          visible={showToast}
          message={toastMessage}
        />
      )}
    </>
  );
};

AddServiceVendorScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(AddServiceVendorScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(32),
  },
  selectTimeText: {
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
    marginLeft: normalize(12),
    marginBottom: normalize(8),
  },
  selectDateText: {
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
    marginLeft: normalize(12),
    marginTop: normalize(32),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: normalize(10),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    width: SCREEN_WIDTH - normalize(32),
    padding: normalize(15),
    borderRadius: normalize(8),
  },
  submitText: {
    ...commonStyles.normalboldText,
  },
  calenderStrip: {
    height: normalize(80),
    backgroundColor: Colors.lightergrey,
    borderTopLeftRadius: normalize(8),
    borderTopRightRadius: normalize(8),
  },
});
