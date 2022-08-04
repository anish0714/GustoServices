import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {Colors} from '../../config/constants/Color';
import {fontSize} from '../../config/constants/Style';

// components
import {HeaderText} from '../../components/Headers';
import {AddService} from '../../components/AddService';

const VendorHomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderText title="Home" />
      <View style={styles.contentContainer}>
        <Text style={styles.serviceNotAddText}>
          Looks like you don't have any booked service
        </Text>
      </View>
      <AddService />
    </View>
  );
};

export default VendorHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentContainer: {
    padding: normalize(16),
  },
  serviceNotAddText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
});
