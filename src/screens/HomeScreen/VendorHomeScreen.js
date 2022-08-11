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
import {ServiceCard} from '../../components/Cards';
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
import {API_URL, END_POINTS} from '../../config/constants/API';
import axios from 'axios';

const VendorHomeScreen = ({navigation, authReducer: {userData}}) => {
  useEffect(() => {
    getServiceHistory(userData._id);
  }, [getServiceHistory]);
  const [servicesData, setServicesData] = useState(null);

  const getServiceHistory = async userId => {
    try {
      const URL = API_URL + END_POINTS.booking + userId;
      console.log(URL);
      const res = await axios.get(URL);
      if (res) {
        const filteredData = res.data.filter(item => item.status === 'open');
        setServicesData(filteredData);
      }
    } catch (err) {
      console.log('ERR', err);
    }
  };
  // console.log(servicesData);
  return (
    <>
      <View style={styles.container}>
        <HeaderText title="Home" />
        {servicesData ? (
          <FlatList
            data={servicesData}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <ServiceCard
                  item={item}
                  userType={userData.userType}
                  onClick={() => navigation.navigate('serviceDetail', [{item}])}
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

VendorHomeScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {})(VendorHomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentContainer: {
    padding: normalize(16),
  },
  serviceNotAddText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
});
