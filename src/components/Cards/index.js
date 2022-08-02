import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';

import normalize from 'react-native-normalize';
import {Colors} from '../../config/constants/Color';
import {
  fontSize,
  commonStyles,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../config/constants/Style';
import {API_URL} from '../../config/constants/API';

//CARD STYLING CALCULATIONS
const cardColumns = 2;
//Margin
const MARGIN = normalize(8);
const CARD_WIDTH = (SCREEN_WIDTH - cardColumns * MARGIN) / cardColumns;

export const HomeScreenCard = ({headerText, buttonText, onClick}) => {
  return (
    <View style={styles.homeCardContainer}>
      <Text style={styles.headerText}>{headerText}</Text>
      <TouchableOpacity style={styles.button} onPress={onClick}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const CategoryCard = ({item, onClick}) => {
  return (
    <TouchableOpacity style={styles.containerCategoryCard} onPress={onClick}>
      <View style={styles.blurContainer} />
      <Image
        // blurRadius={5}
        source={{uri: API_URL + item.categoryImage}}
        style={styles.imageCategoryCard}
      />
      <Text style={styles.textCategoryCard}>
        {item.name && item.name.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export const ViewCategoryCard = ({item, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.viewCategoryCardContainer}
      onPress={onClick}>
      {item.serviceImage ? (
        <Image
          // blurRadius={5}
          source={{
            uri: API_URL + item.serviceImage,
          }}
          style={styles.viewCategoryCardImage}
        />
      ) : (
        <Image
          // blurRadius={5}
          source={{
            uri: API_URL + item.categoryImage,
          }}
          style={styles.viewCategoryCardImage}
        />
      )}
      <Text style={styles.viewCategoryCardText}>
        {item.name && item.name.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

export const ScheduleCard = ({item, index, onClick}) => {
  return (
    <>
      <TouchableOpacity
        style={[
          styles.scheduleCardContainer,
          item.status === 'available' && styles.cardAvailable,
        ]}
        onPress={() => onClick(item, index)}>
        <Text
          style={[
            styles.timeText,
            item.status === 'unavailable' && styles.timeTextBlack,
          ]}>
          {item.time}
        </Text>
        {/* <Text>{item.status}</Text> */}
      </TouchableOpacity>
    </>
  );
};

export const VendorServiceCard = ({item, index, onClick}) => {
  return (
    <TouchableOpacity style={styles.vendorServiceContainer} onPress={onClick}>
      <Text style={styles.vendorServiceNameText}>{item.serviceName}</Text>
      <Text style={styles.vendorServiceRate}>CAD: {item.rate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // --- Vendor Service Card
  vendorServiceContainer: {
    marginHorizontal: normalize(32),
    marginVertical: normalize(10),
    padding: normalize(12),
    // borderWidth: 1,
    borderRadius: normalize(8),
    elevation: 3,
  },
  vendorServiceNameText: {
    ...commonStyles.boldText,
    color: Colors.darkBlue,
  },
  vendorServiceRate: {
    ...commonStyles.normalText,
    color: Colors.darkBlue,
  },
  // --- Schedule Card
  scheduleCardContainer: {
    // borderWidth: 1,
    borderRadius: normalize(8),
    padding: normalize(8),
    margin: normalize(8),
    paddingHorizontal: normalize(20),
    elevation: 2,
  },

  cardAvailable: {
    backgroundColor: Colors.darkBlue,
  },

  timeText: {
    ...commonStyles.normalText,
    // color: Colors.black,
  },
  // --- View Category Card

  timeTextBlack: {
    color: Colors.black,
  },

  viewCategoryCardContainer: {
    width: SCREEN_WIDTH - normalize(32),
    // height: CARD_WIDTH - normalize(16),
    // flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(8),
    margin: normalize(8),
    // borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    borderRadius: normalize(8),
  },
  viewCategoryCardImage: {
    height: normalize(100),
    width: '100%',
    borderRadius: normalize(8),
  },
  viewCategoryCardText: {
    ...commonStyles.normalText,
    color: Colors.darkBlue,
    // marginLeft: normalize(10),
    marginTop: normalize(10),
  },
  // --- Category Card
  blurContainer: {
    opacity: 0.7,
    backgroundColor: Colors.black,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
    borderRadius: normalize(8),
  },
  containerCategoryCard: {
    width: CARD_WIDTH - normalize(16),
    height: CARD_WIDTH - normalize(16),
    // padding: MARGIN,
    margin: MARGIN,
    borderRadius: normalize(8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  imageCategoryCard: {
    width: '100%',
    height: '100%',
    // height: normalize(200),
    borderRadius: normalize(8),
  },
  textCategoryCard: {
    ...commonStyles.boldText,
    fontSize: fontSize.medium,
    position: 'absolute',
    color: Colors.white,
    zIndex: 1,
    textAlign: 'center',
  },
  //Home Card
  homeCardContainer: {
    padding: normalize(10),
    backgroundColor: Colors.darkBlue,
    borderRadius: normalize(8),
    // alignItems: 'center',
    marginBottom: normalize(20),
  },
  headerText: {
    fontSize: fontSize.medium,
    color: Colors.white,
    alignSelf: 'center',
    marginTop: normalize(15),
  },
  button: {
    // flex: 1,
    padding: normalize(10),
    backgroundColor: Colors.white,
    borderRadius: normalize(8),
    marginHorizontal: normalize(30),
    marginVertical: normalize(20),
  },
  buttonText: {
    ...commonStyles.normalText,
    color: Colors.darkBlue,
    alignSelf: 'center',
  },
});
