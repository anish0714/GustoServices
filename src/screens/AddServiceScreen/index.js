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
import normalize from 'react-native-normalize';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';
import {CategoryCard} from '../../components/Cards';

//
import DateTimePicker from '@react-native-community/datetimepicker';

import CalendarStrip from 'react-native-calendar-strip';

//REDUX
import {connect} from 'react-redux';
import {setCategories} from '../../actions/categoryAction';

const AddServiceScreen = ({
  navigation,
  setCategories,
  categoryReducer: {categoryData},
}) => {
  useEffect(() => {
    setCategories();
  }, []);

  // const [categories, setCategories] = useState('CATEGORIES');
  const [services, setServices] = useState('SERVICES');
  const [rate, setRate] = useState('');

  //--------DATE
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [timePicker, setTimePicker] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));
  const [time, setTime] = useState(new Date(Date.now()));

  const [selectedDate, setSelectedDate] = useState(new Date());

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const handleSelectedDate = date => {
    setSelectedDate(date);
    console.log('selectedDate', selectedDate);
  };

  const onChange = (event, value) => {
    setDate(value);
    // console.log('##########DATE', date.split['T']);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
      timeZone: 'America/Toronto',
    };
    const canadianDateFormat = new Date(value).toLocaleString('en-US', options);

    console.log('########', canadianDateFormat);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };
  function showTimePicker() {
    setTimePicker(true);
  }

  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  }

  //--------DATE
  // console.log('DATE', date);
  return (
    <View style={styles.container}>
      <HeaderBackArrow title="SELECT A CATEGORY" />

      {/* <View style={styles.innerContainer}>

        <InputButtonWithLabel
          borderBottom
          onChange={rate => setRate(rate)}
          numeric
          labelText="Rate"
          placeholderText="please add rate"
        />

        <CalendarStrip
          scrollable
          calendarAnimation={{type: 'sequence', duration: 0}}
          style={{
            height: normalize(80),
            backgroundColor: Colors.lightergrey,
            borderTopLeftRadius: normalize(8),
            borderTopRightRadius: normalize(8),
          }}
          calendarColor={Colors.lightergrey}
          calendarHeaderStyle={{marginVertical: 8}}
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
      </View> */}

      {categoryData?.length > 0 ? (
        <FlatList
          // horizontal={true}
          numColumns={2}
          data={categoryData}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <CategoryCard
                item={item}
                onClick={() => navigation.navigate('displayServices', [{item}])}
              />
            );
          }}
        />
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.selectCategory}>
            Sorry categories are not added
          </Text>
        </View>
      )}
    </View>
  );
};

AddServiceScreen.prototypes = {
  categoryReducer: PropTypes.object.isRequired,
  setCategories: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  categoryReducer: state.categoryReducer,
});

export default connect(mapStateToProps, {setCategories})(AddServiceScreen);

const AddServiceButton = ({value}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
      <Text style={styles.buttonValue}>{value}</Text>
      <Image
        style={styles.buttonImage}
        source={require('../../assets/drop_down_icon.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    paddingHorizontal: normalize(32),
  },
  buttonContainer: {
    borderWidth: 1,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(15),
    borderColor: Colors.darkBlue,
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: normalize(30),
  },
  buttonImage: {
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.darkBlue,
    resizeMode: 'contain',
  },
  buttonValue: {
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
  },

  //
  datePicker: {
    width: normalize(320),
    height: normalize(260),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: Colors.darkBlue,
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});
