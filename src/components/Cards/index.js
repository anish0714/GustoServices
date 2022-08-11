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
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Rating} from 'react-native-ratings';

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

export const CategoryCircularCard = ({item, onClick}) => {
  return (
    <TouchableOpacity style={styles.containerCircularCard} onPress={onClick}>
      {/* <View style={styles.blurContainer} /> */}
      <View style={styles.imageCategoryCircularCardContainer}>
        <Image
          // blurRadius={5}
          source={
            item.categoryImage
              ? {
                  uri: API_URL + item.categoryImage,
                }
              : {
                  uri: API_URL + item.serviceImage,
                }
          }
          style={styles.imageCategoryCircularCard}
        />
      </View>
      <View style={styles.textContainerCategoryCircularCard}>
        <Text style={styles.textCategoryCircularCard}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const FeedbackCard = ({item}) => {
  return (
    <View style={styles.feedbackContainer}>
      <View style={styles.topContainer}>
        <Text style={styles.feedbackFullName}>{item.userId.fullName}</Text>

        <Rating
          readonly={true}
          type={'custom'}
          startingValue={item.rating}
          imageSize={fontSize.medium}
          ratingColor={Colors.golden}
          ratingBackgroundColor={Colors.greyText3}
          tintColor={Colors.white}
          style={styles.ratingStyle}
        />
      </View>
      <Text style={styles.feedbackReview}>{item.review}</Text>
      <Text style={styles.feedbackDate}>
        Reviewed on {item.date.split('T')[0]}
      </Text>
    </View>
  );
};

export const CustomerScheduleCard = ({item, onClick}) => {
  return (
    <>
      {item.status === 'available' || item.status === 'selected' ? (
        <TouchableOpacity
          style={[
            styles.scheduleCardContainer,
            item.status === 'selected' && styles.cardAvailable,
          ]}
          onPress={() => onClick(item)}>
          <Text
            style={[
              styles.timeText,
              item.status !== 'selected' && styles.timeTextBlack,
              // styles.timeTextBlack,
            ]}>
            {item.time}
          </Text>
          {/* <Text>{item.status}</Text> */}
        </TouchableOpacity>
      ) : (
        <View
          style={[
            styles.scheduleCardContainer,
            item.status === 'unavailable'
              ? styles.cardUnAvailable
              : styles.cardAvailable,
          ]}
          onPress={() => onClick(item)}>
          <Text
            style={[
              item.status === 'unavailable'
                ? styles.timeTextBlack
                : styles.timeText,
            ]}>
            {item.status}
          </Text>
          {/* <Text>{item.status}</Text> */}
        </View>
      )}
    </>
  );
};

export const ServiceCard = ({item, userType, onClick}) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onClick}>
      {/* top */}
      <View style={styles.cardTopContainer}>
        <Text style={styles.cardTopText}>{item.serviceId.name}</Text>
        <Text style={styles.cardTopText}>{item.status.toUpperCase()}</Text>
      </View>
      {/* main */}
      <View style={styles.cardMainContainer}>
        {/* <Image style={styles.cardImage} source={item.image} /> */}
        <View
          style={{
            marginLeft: normalize(10),
            flex: 1,
          }}>
          <Text style={styles.cardMainText}>
            {userType === 'customer'
              ? item.vendorId.fullName
              : item.userId.fullName}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   width: '70%',
              marginTop: normalize(5),
            }}>
            <Text style={styles.cardMainText}>
              {item.selectedDate.split('T')[0]}
            </Text>
            <Text style={styles.cardMainText}>{item.selectedTime}</Text>
          </View>
          <View style={styles.cardBottomContainer}>
            <Text style={styles.cardMainText}>ID #{item._id}</Text>
            <Text style={styles.cardMainText}>$ {item.totalPrice}/hr</Text>
          </View>
        </View>
      </View>
      {/* bottom */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // --- Feedback card
  feedbackContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: normalize(32),
    marginVertical: normalize(5),
    borderRadius: normalize(8),
    elevation: normalize(8),
    padding: normalize(12),
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingStyle: {
    // borderWidth: 1,
    alignSelf: 'flex-start',
  },
  feedbackFullName: {
    ...commonStyles.boldText,
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
  feedbackDate: {
    ...commonStyles.normalText,
    fontSize: fontSize.small,
    color: Colors.greyText1,
  },
  feedbackReview: {
    ...commonStyles.normalText,
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
  // --- Category Circular card

  containerCircularCard: {
    margin: normalize(10),
    // aligns: 'center',
    // elevation: normalize(8),
    // borderRadius: normalize(8),
  },
  imageCategoryCircularCard: {
    borderRadius: normalize(50),
    // elevation: normalize(8),
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  imageCategoryCircularCardContainer: {
    height: normalize(100),
    width: normalize(100),
    borderRadius: normalize(100),
    elevation: normalize(15),
  },

  textContainerCategoryCircularCard: {
    width: normalize(100),
    // borderWidth: 1,
    alignItems: 'center',
    marginTop: normalize(8),
  },
  textCategoryCircularCard: {
    ...commonStyles.normalboldText,
    color: Colors.darkBlue,
    textAlign: 'center',

    // alignText: 'center'
  },
  // --- Vendor Service Card
  vendorServiceContainer: {
    marginHorizontal: normalize(32),
    marginVertical: normalize(10),
    padding: normalize(12),
    // borderWidth: 1,
    borderRadius: normalize(8),
    elevation: normalize(8),
    backgroundColor: Colors.white,
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
    width: normalize(100),
    alignItems: 'center',
  },

  cardAvailable: {
    backgroundColor: Colors.darkBlue,
    // color: Colors.white,
  },
  cardUnAvailable: {
    backgroundColor: Colors.greyText2,
  },

  timeText: {
    ...commonStyles.normalText,
    // color: Colors.black,
  },
  // --- View Category Card

  timeTextBlack: {
    ...commonStyles.normalText,
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
    // backgroundColor: Colors.darkBlue,
    borderRadius: normalize(8),
    // alignItems: 'center',
    marginBottom: normalize(20),
    elevation: normalize(5),
    width: normalize((SCREEN_WIDTH - 72) / 2),
  },
  headerText: {
    ...commonStyles.normalboldText,
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
    alignSelf: 'center',
    marginTop: normalize(15),
  },
  button: {
    // flex: 1,
    padding: normalize(10),
    backgroundColor: Colors.darkBlue,
    borderRadius: normalize(8),
    marginHorizontal: normalize(30),
    marginVertical: normalize(20),
    elevation: normalize(5),
  },
  buttonText: {
    ...commonStyles.normalboldText,
    // color: Colors.white,
    alignSelf: 'center',
  },

  //-------------service card
  cardContainer: {
    // padding: normalize(8),
    marginHorizontal: normalize(32),
    marginVertical: normalize(8),
    elevation: normalize(5),
    // borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: normalize(10),
  },
  cardTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.darkBlue,
    padding: normalize(10),
    borderTopLeftRadius: normalize(7),
    borderTopRightRadius: normalize(7),
  },
  cardTopText: {
    color: Colors.white,
    fontSize: fontSize.small,
  },
  cardMainText: {
    color: Colors.darkBlue,
    fontSize: fontSize.small,
  },
  cardBottomContainer: {
    // paddingHorizontal: normalize(10),
    // paddingBottom: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardImage: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(50),
  },
  cardMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: normalize(10),
    // flex:1,
    // borderWidth: 1,
  },
});
