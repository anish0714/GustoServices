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
import {ViewCategoryCard} from '../../components/Cards';
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

const DisplayServiceScreen = ({
  navigation,
  route,
  setServices,
  categoryReducer: {selectedCategoryServiceData, serviceData, isLoading},
}) => {
  const categoryName = route.params[0].item.name;

  useEffect(() => {
    handleGetServices();
  }, []);
  const handleGetServices = () => {
    const categories = route.params[0].item._id;
    setServices(categories);
  };
  return (
    <>
      {/* <Loader isLoading={isLoading} /> */}
      <HeaderBackArrow title={`${categoryName} SERVICES`} />

      <View style={styles.container}>
        {selectedCategoryServiceData?.length > 0 ? (
          <FlatList
            // horizontal={true}
            // numColumns={1}
            showsVerticalScrollIndicator={false}
            data={selectedCategoryServiceData}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <ViewCategoryCard
                  item={item}
                  onClick={() =>
                    navigation.navigate('addServiceVendor', [
                      {SelectedServiceItem: item},
                    ])
                  }
                />
              );
            }}
          />
        ) : (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.selectCategory}>
              Sorry categories are not added
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

DisplayServiceScreen.prototypes = {
  categoryReducer: PropTypes.object.isRequired,
  setServices: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  categoryReducer: state.categoryReducer,
});

export default connect(mapStateToProps, {setServices})(DisplayServiceScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    // height: SCREEN_HEIGHT,
  },
});
