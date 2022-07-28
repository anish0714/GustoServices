import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../config/constants/Color';
import Schedule from 'f-react-native-schedule';
import CalendarStrip from 'react-native-calendar-strip';

import {
  Calendar,
  CalendarList,
  Agenda,
  calendarTheme,
} from 'react-native-calendars';
// import CalenderStr
const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      {/* <Calendar
        // Initially visible month. Default = now
        initialDate={date}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={'2022-07-10'}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2022-12-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Handler which gets executed on day long press. Default = undefined
        onDayLongPress={day => {
          console.log('selected day', day);
          setDate(day.dateString)
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // Hide month navigation arrows. Default = false
        hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        renderArrow={direction => <Arrow />}
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Hide day names. Default = false
        // hideDayNames={true}
        // Show week numbers to the left. Default = false
        showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        disableArrowLeft={true}
        // Disable right arrow. Default = false
        disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        // disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter
        renderHeader={date => {
          // console.log('date', date);
          return (
            <View>
              <Text>CALENDAR</Text>
            </View>
          );
        }}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      /> */}
      <CalendarStrip
        scrollable
        calendarAnimation={{type: 'sequence', duration: 0}}
        style={{
          height: 80,
          backgroundColor: Colors.lightergrey,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
        calendarColor={Colors.lightergrey}
        calendarHeaderStyle={{marginVertical: 8}}
        dateNumberStyle={{color: Colors.greyText}}
        dateNameStyle={{color: 'black'}}
        highlightDateNumberStyle={{color: 'black'}}
        highlightDateNameStyle={{color: 'black'}}
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
        selectedDate={selectedDate}
        onDateSelected={newDate => setSelectedDate(newDate)}
        highlightDateNumberContainerStyle={{backgroundColor: Colors.golden}}
        highlightDateContainerStyle={{backgroundColor: Colors.golden}}
        iconContainer={{height: 50, width: 20, backgroundColor: 'black'}}
        iconLeft={require('../../assets/calendar-right-arrow.png')}
        iconRight={require('../../assets/calendar-right-arrow.png')}
      />
    </>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({});
