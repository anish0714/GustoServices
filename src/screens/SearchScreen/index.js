import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Button,
  FlatList,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
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
import {Searchbar} from 'react-native-paper';

//REDUX
import {connect} from 'react-redux';
// action
import {setCategories} from '../../actions/categoryAction';

import axios from 'axios';
import {API_URL, END_POINTS} from '../../config/constants/API';

const SearchScreen = ({navigation}) => {
  useEffect(() => {
    getServicesData();
  }, []);

  const [serviceData, setServicesData] = useState(null);
  const [searchData, setSearchData] = useState(null);
  // search
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    const updatedData = serviceData.filter(item => {
      const item_data = `${item.name.toUpperCase()})`;
      const text_data = query.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setSearchQuery(query);
    if (query?.length === 0) {
      setSearchData(null);
    } else {
      setSearchData(updatedData);
    }
  };

  console.log('searchData', searchData);
  const getServicesData = async () => {
    try {
      const URL = API_URL + END_POINTS.getAllService;
      const res = await axios.get(URL);
      //   console.log(res.data);
      if (res && res.data) {
        setServicesData(res.data.data);
      } else {
        setServicesData(null);
      }
    } catch (err) {
      console.log('ERR', err);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{
                height: normalize(20),
                width: normalize(10),
                tintColor: Colors.darkBlue,
              }}
              source={require('../../assets/back_button.png')}
            />
          </TouchableOpacity>
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchBox}
            icon={require('../../assets/search.png')}
            iconColor={Colors.darkBlue}
            inputStyle={{...commonStyles.normalText, color: Colors.black}}
            clearIcon={require('../../assets/close.png')}
          />
        </View>
        <View style={styles.mainContainer}>
          {searchData ? (
            <FlatList
              // horizontal={true}
              showsVerticalScrollIndicator={false}
              numColumns={3}
              data={searchData}
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
          ) : (
            <View>
              <Text>NoCategory found</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  searchBox: {
    width: normalize(SCREEN_WIDTH * 0.75),
    height: normalize(40),
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(16),
    marginVertical: normalize(16),
  },
  mainContainer: {
    paddingHorizontal: normalize(16),
  },
});
