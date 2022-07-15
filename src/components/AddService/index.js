import {StyleSheet, Image, TouchableOpacity, View, Text} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import {Colors} from '../../config/constants/Color';
export const AddService = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('addService')}
      style={styles.addImageContainer}>
      {/* <Text style={styles.addServiceText}>Add Service</Text> */}
      <Image
        style={styles.logoImage}
        source={require('../../assets/add_filled.png')}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addImageContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: normalize(60),
    right: normalize(10),
    // backgroundColor: Colors.darkBlue,
    padding: normalize(8),
    borderRadius: normalize(32),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: Colors.darkBlue,
  },
  logoImage: {
    resizeMode: 'contain',
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.white,
  },
  addServiceText: {
    marginRight: normalize(10),
    color: Colors.white,
  },
});
