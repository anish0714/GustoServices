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

import CalendarStrip from 'react-native-calendar-strip';
//REDUX
import {connect} from 'react-redux';
// action
import {
  addVendorService,
  getVendorService,
  setToast,
} from '../../actions/vendorAction';

const EditScheduleScreen = ({route}) => {
  const {selectedService} = route.params[0];
  const vendorSchedule = route.params[0].selectedService.schedule;
  const [scheduleTime, setScheduleTime] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [serviceSchedule, setServiceSchedule] = useState(vendorSchedule);

  useEffect(() => {
    // setServiceSchedule(vendorSchedule);
    // if (serviceSchedule) {
    //   setTiming(selectedDate);
    // }
    setTiming(selectedDate);
  }, []);

  //   console.log('selectedService', selectedService);

  const setTiming = selectedDate => {
    const timing = [
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
    ];
    // console.log('selectedDate', JSON.stringify(selectedDate).split('T')[0]);
    let data = null;
    if (serviceSchedule) {
      data = serviceSchedule.filter(
        schedule =>
          JSON.stringify(schedule.date).split('T')[0] ===
          JSON.stringify(selectedDate).split('T')[0],
      )[0];
    }

    console.log('DATA', data);
    if (data) {
      setScheduleTime(data.timings);
    } else {
      serviceSchedule.push({
        date: selectedDate,
        timings: timing,
      });
      setScheduleTime(timing);
    }
  };
  console.log('serviceSchedule\n', serviceSchedule);

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

    setScheduleTime(schedule);
  };

  const handleSelectedDate = date => {
    setTiming(date);
    setSelectedDate(date);
  };

  return (
    <>
      <HeaderBackArrow title={`Edit ${selectedService.serviceName}`} />
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
      </View>
    </>
  );
};

export default EditScheduleScreen;

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
    borderTopLeftRadius: normalize(8),
    borderTopRightRadius: normalize(8),
  },
});
