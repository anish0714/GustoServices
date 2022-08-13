import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
// constants
import {Colors} from '../../config/constants/Color';
import {commonStyles} from '../../config/constants/Style';
// component
import {HeaderBackArrow} from '../../components/Headers';
import normalize from 'react-native-normalize';
import {CategoryCard} from '../../components/Cards';


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

  //--------DATE
  // console.log('DATE', date);
  return (
    <View style={styles.container}>
      <HeaderBackArrow title="Select A Category" />

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
