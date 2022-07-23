import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {useState} from 'react';

// constants
import {Colors} from '../../config/constants/Color';
import {fontSize, fontFamily, commonStyles} from '../../config/constants/Style';
// component
import {HeaderBackArrow} from '../../components/Headers';
import normalize from 'react-native-normalize';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';

//
import DateTimePicker from '@react-native-community/datetimepicker';

const AddServiceScreen = ({navigation}) => {
  const [categories, setCategories] = useState('CATEGORIES');
  const [services, setServices] = useState('SERVICES');
  const [rate, setRate] = useState('');

  //--------DATE
  const [isPickerShow, setIsPickerShow] = useState(false);
  const [date, setDate] = useState(new Date(Date.now()));

  const showPicker = () => {
    setIsPickerShow(true);
  };

  const onChange = (event, value) => {
    setDate(value);
    if (Platform.OS === 'android') {
      setIsPickerShow(false);
    }
  };

  //--------DATE
  console.log('DATE', date);
  return (
    <View style={styles.container}>
      <HeaderBackArrow title="ADD SERVICE" />
      <View style={styles.innerContainer}>
        <AddServiceButton value={categories} />
        <AddServiceButton value={services} />
        <InputButtonWithLabel
          borderBottom
          onChange={rate => setRate(rate)}
          numeric
          labelText="Rate"
          placeholderText="please add rate"
        />
        <View style={{marginTop: normalize(30)}}>
          <LargeButton
            title="Add Availability"
            // onClick={showPicker}
            onClick={() => navigation.navigate('calendarScreen')}
          />
        </View>

        {/* The date picker */}
        {isPickerShow && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            is24Hour={true}
            onChange={onChange}
            style={styles.datePicker}
          />
        )}
      </View>
    </View>
  );
};

export default AddServiceScreen;

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
    paddingHorizontal: normalize(48),
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
});
