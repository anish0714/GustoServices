import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import normalize from 'react-native-normalize';
import PropTypes from 'prop-types';
import {Colors} from '../../config/constants/Color';
import {
  fontSize,
  commonStyles,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../config/constants/Style';
// components
import {HeaderText} from '../../components/Headers';
import {AddService} from '../../components/AddService';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {VendorServiceCard} from '../../components/Cards';
// API
import {API_URL, END_POINTS} from '../../config/constants/API';
import axios from 'axios';
//REDUX
import {connect} from 'react-redux';
// action
import {getVendorService} from '../../actions/vendorAction';

const ScheduleScreen = ({
  navigation,
  getVendorService,
  vendorReducer: {vendorData},
  authReducer: {userData},
}) => {
  const [loading, setLoading] = useState(false);

  // const [vendorService, setVendorService] = useState();
  useEffect(() => {
    getVendorService(userData._id);
  }, []);

  // const getVendorService = async () => {
  //   setLoading(true);
  //   console.log('getVendorService');
  //   try {
  //     const URL = API_URL + END_POINTS.getVendorsService;
  //     const PAYLOAD = {
  //       vendor_id: userData._id,
  //     };
  //     const res = await axios.post(URL, PAYLOAD);
  //     if (res) {
  //       console.log('RES>DATA \n', res.data);
  //       setVendorService(res.data);
  //     }
  //     setLoading(false);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  // console.log('vendorData', vendorData);

  return (
    <>
      {/* <Loader isLoading={loading} /> */}
      <HeaderText title="SERVICE" />

      <View style={styles.container}>
        <FlatList
          // horizontal={true}
          // showsHorizontalScrollIndicator={false}
          // numColumns={3}
          data={vendorData}
          keyExtractor={item => item._id}
          renderItem={({item, index}) => {
            return (
              <VendorServiceCard
                item={item}
                onClick={() =>
                  navigation.navigate('editSchedule', [
                    {
                      selectedService: item,
                    },
                  ])
                }
              />
            );
          }}
        />
      </View>
      <AddService />
    </>
  );
};

ScheduleScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
  vendorReducer: PropTypes.object.isRequired,
  getVendorService: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
  vendorReducer: state.vendorReducer,
});

export default connect(mapStateToProps, {getVendorService})(ScheduleScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
