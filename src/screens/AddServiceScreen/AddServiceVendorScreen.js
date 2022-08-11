import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
// constants
import {Colors} from '../../config/constants/Color';
import {
  fontSize,
  fontFamily,
  commonStyles,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../config/constants/Style';
// component
import {HeaderBackArrow} from '../../components/Headers';
import normalize from 'react-native-normalize';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';
import {ScheduleCard} from '../../components/Cards';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BottomSheetUploadImage} from '../../components/BottomSheet';

import CalendarStrip from 'react-native-calendar-strip';
//REDUX
import {connect} from 'react-redux';
// action
import {
  addVendorService,
  getVendorService,
  setToast,
} from '../../actions/vendorAction';

const AddServiceVendorScreen = ({
  route,
  navigation,
  addVendorService,
  setToast,
  authReducer: {userData},
  vendorReducer: {isLoading, isShowToast, showToastMessage},
}) => {
  useEffect(() => {
    if (
      isShowToast === true &&
      showToastMessage === 'Service added to the profile!'
    ) {
      console.log('navigate');
      setToast();
      navigation.navigate('successScreen', [{showToastMessage}]);
    }
  }, [isShowToast, showToastMessage]);

  const {SelectedServiceItem} = route.params[0];
  console.log(SelectedServiceItem.name);
  const [rate, setRate] = useState(0);
  const [serviceName, setServiceName] = useState(SelectedServiceItem.name);
  const [orgName, setOrgName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [asset, setAsset] = useState(null);
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

  //--------DATE

  const [selectedDate, setSelectedDate] = useState(new Date());
  const handleSelectedDate = date => {
    setSelectedDate(date);
  };

  /// --- GALLERY
  const onClickSelectImage = isOpenGallery => {
    refOpenGalleryBottomSheet.current.close();

    // Adding setTimeout so that Bottomsheet gets closed
    setTimeout(() => {
      let options = {
        mediaType: 'photo',
        // quality: 1
      };
      isOpenGallery
        ? launchImageLibrary(options, response => {
            try {
              if (response && response.assets) {
                setAsset(response.assets[0]);
              }
            } catch (err) {
              console.log(err);
            }
          })
        : launchCamera(options, response => {
            if (response && response.assets) {
              setAsset(response.assets[0]);
            }
          });
    }, 500);
  };
  // ref
  const refOpenGalleryBottomSheet = useRef(null);

  const handleSubmit = async () => {
    await addVendorService(
      serviceName,
      rate,
      userData._id,
      SelectedServiceItem._id,
      selectedDate,
      scheduleTime,
      orgName,
      bio,
      location,
    );
  };

  return (
    <>
      {/* <Loader isLoading={isLoading} /> */}

      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <>
          <HeaderBackArrow title={`${SelectedServiceItem.name}`} />
          <KeyboardAvoidingView style={styles.container}>
            <ScrollView
              contentContainerStyle={{
                // flex: 1,
                paddingBottom: normalize(235),
                //   paddingTop: SCREEN_WIDTH * 0.1,
              }}>
              <View style={{alignSelf: 'center'}}>
                {/* <InputButtonWithLabel
                  borderBottom
                  value={serviceName}
                  onChange={serviceName => setServiceName(serviceName)}
                  labelText="Service Name"
                  placeholderText="please add service name"
                /> */}

                <InputButtonWithLabel
                  borderBottom
                  onChange={rate => setRate(rate)}
                  numeric
                  labelText="Rate"
                  placeholderText="please add rate"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={orgName => setOrgName(orgName)}
                  labelText="Organization Name"
                  placeholderText="please add organization name"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={bio => setBio(bio)}
                  labelText="Bio"
                  placeholderText="please add bio"
                />
                <InputButtonWithLabel
                  borderBottom
                  onChange={location => setLocation(location)}
                  labelText="Location"
                  placeholderText="please add location"
                />
              </View>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={handleSubmit}>
                <Text style={styles.submitText}>SUBMIT</Text>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </>
      </TouchableWithoutFeedback>
      <BottomSheetUploadImage
        refRBSheet={refOpenGalleryBottomSheet}
        onClickCamera={() => onClickSelectImage(false)} // false means open gallery = false
        onClickGallery={() => onClickSelectImage(true)}
      />
      {isShowToast && (
        <ShowToast
          onDismiss={() => setToast()}
          visible={isShowToast}
          message={showToastMessage}
        />
      )}
    </>
  );
};

AddServiceVendorScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
  vendorReducer: PropTypes.object.isRequired,
  addVendorService: PropTypes.func.isRequired,
  setToast: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
  vendorReducer: state.vendorReducer,
});

export default connect(mapStateToProps, {
  addVendorService,
  setToast,
  getVendorService,
})(AddServiceVendorScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: normalize(32),
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
    bottom: normalize(0),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: Colors.darkBlue,
    width: SCREEN_WIDTH - normalize(32),
    padding: normalize(15),
    borderRadius: normalize(10),
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
  addImageContainer: {
    width: SCREEN_WIDTH * 0.75,
    borderWidth: 1,
    // marginTop: normalize(24),
    borderRadius: normalize(8),
    // padding: Platform.OS == 'ios' ? 8 : 8,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(4),
    borderColor: Colors.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addImageText: {
    ...commonStyles.normalText,
    color: Colors.darkBlue,
  },
  dropDownImage: {
    tintColor: Colors.darkBlue,
    height: normalize(10),
    resizeMode: 'contain',
  },
  categoryImageText: {
    ...commonStyles.normalboldText,
    width: SCREEN_WIDTH * 0.75,
    marginTop: normalize(24),
    marginBottom: normalize(8),
    paddingHorizontal: normalize(6),

    color: Colors.darkBlue,
  },
  selectedImage: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH * 0.75,
    resizeMode: 'contain',
    marginTop: normalize(30),
  },
});
