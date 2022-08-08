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
import {ViewCategoryCard, CategoryCircularCard} from '../../components/Cards';
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

//REDUX
import {connect} from 'react-redux';
import {setServices} from '../../actions/categoryAction';

const DisplayServiceCustomerScreen = ({
  navigation,
  route,
  setServices,
  categoryReducer: {selectedCategoryServiceData, serviceData, isLoading},
}) => {
  const categoryName = route.params[0].item.name;
  console.log(categoryName);
  useEffect(() => {
    handleGetServices();
  }, []);
  const handleGetServices = async () => {
    const categories = route.params[0].item._id;
    await setServices(categories);
  };
  console.log('selectedCategoryServiceData', selectedCategoryServiceData);

  return (
    <>
      <HeaderBackArrow title={`${categoryName} SERVICES`} />
      <View style={styles.container}>
        <Text style={styles.categoryText}>Services</Text>
        <View style={styles.categoriesContainer}>
          <FlatList
            // horizontal={true}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={selectedCategoryServiceData}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <CategoryCircularCard
                  item={item}
                  onClick={() =>
                    navigation.navigate('displayVendors', [{item}])
                  }
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

DisplayServiceCustomerScreen.prototypes = {
  categoryReducer: PropTypes.object.isRequired,
  setServices: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  categoryReducer: state.categoryReducer,
});
export default connect(mapStateToProps, {setServices})(
  DisplayServiceCustomerScreen,
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  categoriesContainer: {
    // alignItems: 'center',
    // marginTop: normalize(32),
    marginBottom: normalize(80),
    marginLeft: normalize(16),
  },
  categoryText: {
    ...commonStyles.boldText,
    color: Colors.darkBlue,
    marginTop: normalize(16),
    marginLeft: normalize(32),
  },
});
