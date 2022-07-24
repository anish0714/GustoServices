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
import {HeaderBackArrow} from '../../components/Headers';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {BottomSheetUploadImage} from '../../components/BottomSheet';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {CategoryCard} from '../../components/Cards';
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
import {setCategories} from '../../actions/categoryAction';

const AddServiceAdminScreen = ({
  navigation,
  setCategories,
  categoryReducer: {categoryData},
}) => {
  // console.log('categoryData', categoryData.data[0]._id);
  useEffect(() => {
    setCategories();
  }, []);
  return (
    <>
      <HeaderBackArrow title="Add Service" />
      {/* <Loader isLoading={loading} /> */}
      <View style={styles.container}>
        <Text style={styles.selectCategory}>Please select category</Text>

        {/* <Text>AddServiceAdminScreen</Text> */}
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
                  onClick={() => navigation.navigate('createService', [{item}])}
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

AddServiceAdminScreen.prototypes = {
  categoryReducer: PropTypes.object.isRequired,
  setCategories: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  categoryReducer: state.categoryReducer,
});

export default connect(mapStateToProps, {setCategories})(AddServiceAdminScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  categoryCardContainer: {
    flexWrap: 'wrap',
  },
  selectCategory: {
    ...commonStyles.boldText,
    color: Colors.darkBlue,
  },
});
