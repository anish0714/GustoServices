import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import normalize from 'react-native-normalize';
import {Colors} from '../../config/constants/Color';
import {fontSize} from '../../config/constants/Style';

// components
import {HeaderText} from '../../components/Headers';

const AdminHomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <HeaderText title="Home" />
      <View style={styles.contentContainer}>
        <Text style={styles.serviceNotAddText}>
          Looks like you haven't added any service
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('addService')}
        style={styles.addImageContainer}>
        <Image
          style={styles.logoImage}
          source={require('../../assets/add_filled.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AdminHomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addImageContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: normalize(50),
    // backgroundColor: Colors.darkBlue,
    padding: normalize(8),
    borderRadius: normalize(32),
  },
  logoImage: {
    resizeMode: 'contain',
    height: normalize(40),
    width: normalize(40),
    tintColor: Colors.darkBlue,
  },
  contentContainer: {
    padding: normalize(16),
  },
  serviceNotAddText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
});
