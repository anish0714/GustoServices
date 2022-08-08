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
import {VendorServiceCard} from '../../components/Cards';
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

const DisplayVendors = ({route, navigation}) => {
  const serviceId = route.params[0].item._id;
  const serviceName = route.params[0].item.name;
  const [vendorsData, setVendorsData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    handleGetVendors(serviceId);
  }, []);
  console.log('serviceId', serviceId);

  const handleGetVendors = async id => {
    try {
      setLoading(true);
      if (id) {
        console.log(id);
        const URL = API_URL + END_POINTS.getAllVendorsByServiceId + id;
        const res = await axios.get(URL);
        // console.log('res.data', res.data);
        setVendorsData(res.data.data);
      }
      setLoading(false);
    } catch (err) {
      console.log('ERROR', err);
      setLoading(false);
    }
  };

  //   console.log(loading);
  return (
    <>
      <Loader isLoading={loading} />
      <View style={styles.container}>
        <HeaderBackArrow title={serviceName} />
        <FlatList
          data={vendorsData}
          keyExtractor={item => item._id}
          renderItem={({item}) => {
            return (
              <VendorServiceCard
                item={item}
                onClick={() => navigation.navigate('bookService', [{item}])}
              />
            );
          }}
        />
      </View>
    </>
  );
};

export default DisplayVendors;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
