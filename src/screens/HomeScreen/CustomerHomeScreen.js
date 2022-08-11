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
import {
  fontSize,
  commonStyles,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../config/constants/Style'; // component
import {HeaderText} from '../../components/Headers';
import normalize from 'react-native-normalize';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {LargeButton} from '../../components/Button';
import {ScheduleCard} from '../../components/Cards';
import {ShowToast} from '../../components/Toast';
import {Loader} from '../../components/Loader';
import {CategoryCard, CategoryCircularCard} from '../../components/Cards';

//REDUX
import {connect} from 'react-redux';
// action
import {setCategories} from '../../actions/categoryAction';

const CustomerHomeScreen = ({
  navigation,
  setCategories,
  authReducer: {userData},
  categoryReducer: {categoryData},
}) => {
  useEffect(() => {
    setCategories();
  }, []);
  // console.log('categoryData', categoryData);
  return (
    <>
      <HeaderText title={'HOME'} />
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={() => navigation.navigate('searchScreen')}>
          <Image
            style={styles.searchLogo}
            source={require('../../assets/search.png')}
          />
          <Text style={styles.searchText}>
            Tell us what are you looking for today..
          </Text>
        </TouchableOpacity>
        <Text style={styles.categoryText}>Categories</Text>
        <View style={styles.categoriesContainer}>
          <FlatList
            // horizontal={true}
            showsVerticalScrollIndicator={false}
            numColumns={3}
            data={categoryData}
            keyExtractor={item => item._id}
            renderItem={({item}) => {
              return (
                <CategoryCircularCard
                  item={item}
                  onClick={() =>
                    navigation.navigate('displayCustomerServices', [{item}])
                  }
                />
              );
            }}
            // ListHeaderComponent={() => {
            //   return (
            //     <>
            //       <Text>SUME TEXT</Text>
            //     </>
            //   );
            // }}
            // ListFooterComponent={() => {
            //   return (
            //     <>
            //       <Text>SUME TEXT</Text>
            //     </>
            //   );
            // }}
          />
        </View>
        {/* <Text>SOME TEXT</Text> */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  // --- SEARCH
  searchContainer: {
    alignSelf: 'center',
    paddingVertical: normalize(12),
    paddingHorizontal: normalize(12),
    elevation: normalize(8),
    // elevation: 5,
    borderRadius: normalize(8),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  searchText: {
    ...commonStyles.normalText,
    color: Colors.greyText,
    marginLeft: normalize(10),
    marginRight: normalize(20),
  },
  searchLogo: {
    resizeMode: 'contain',
    height: normalize(18),
    width: normalize(18),
    // tintColor: Colors.darkBlue,
  },
  //-----SCREEN STYLE
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  categoryText: {
    ...commonStyles.boldText,
    color: Colors.darkBlue,
    marginTop: normalize(16),
    marginLeft: normalize(32),
  },
  categoriesContainer: {
    marginLeft: normalize(16),
    // alignItems: 'center',
    // marginTop: normalize(32),
    marginBottom: normalize(80),
  },
});

CustomerHomeScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
  categoryReducer: PropTypes.object.isRequired,
  setCategories: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  authReducer: state.authReducer,
  categoryReducer: state.categoryReducer,
});

export default connect(mapStateToProps, {setCategories})(CustomerHomeScreen);
