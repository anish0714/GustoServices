import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

import {HeaderText} from '../../components/Headers';

// colors
import {Colors} from '../../config/constants/Color';
import {fontSize} from '../../config/constants/Style';
import normalize from 'react-native-normalize';

const ProfileScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderText title="PROFILE" />
      <View style={styles.upperContainer}>
        <TouchableOpacity style={styles.imageContainer}>
          <Image
            style={styles.profileImage}
            source={require('../../assets/profile_image.png')}
          />
          <View style={styles.cameraContainer}>
            <Image
              style={styles.cameraIcon}
              source={require('../../assets/camera.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.userNameContainer}>
          <Text style={styles.userNameText}>Anish Dandekar</Text>
          <Text style={styles.userNameText}>Waterloo</Text>
        </View>
      </View>
      <ScrollView style={styles.bottomContainer}>
        <ProfileItem
          title="Edit Profile"
          isRightArrow
          onPress={() => navigation.navigate('editProfile')}
        />
        <ProfileItem
          title="About Us"
          isRightArrow
          onPress={() => navigation.navigate('aboutUs')}
        />
        <ProfileItem title="Logout" />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const ProfileItem = ({title, isRightArrow, onPress}) => {
  return (
    <TouchableOpacity style={styles.profileItemContainer} onPress={onPress}>
      <Text style={styles.profileItemText}>{title}</Text>

      {isRightArrow && (
        <Image
          style={styles.rightIcon}
          source={require('../../assets/calendar-right-arrow.png')}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  rightIcon: {
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.darkBlue,
    resizeMode: 'contain',
  },
  profileItemContainer: {
    elevation: 1,
    //  borderWidth: 1,
    //  borderColor: Colors.borderGrey,
    padding: normalize(20),
    borderRadius: normalize(14),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: normalize(10),
  },
  profileItemText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginBottom: normalize(50),
  },
  upperContainer: {
    // backgroundColor: Colors.darkBlue,
    // alignItems: 'center',
    flexDirection: 'row',
  },
  bottomContainer: {
    marginHorizontal: normalize(32),
    marginVertical: normalize(16),
  },
  imageContainer: {
    // borderWidth: 2,
    // borderColor: Colors.golden,
    height: normalize(100),
    width: normalize(100),
    alignItems: 'center',
    // alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
    borderRadius: normalize(100),
    // elevation: 20,
    marginLeft: normalize(32),
  },
  profileImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: normalize(100),
  },
  userNameContainer: {
    marginTop: normalize(16),
    marginLeft: normalize(16),
  },
  userNameText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: normalize(20),
    padding: normalize(8),
    // borderWidth: 1
  },
  cameraIcon: {
    height: normalize(20),
    width: normalize(20),
    // tintColor: Colors.darkBlue,
    resizeMode: 'contain',
  },
});
