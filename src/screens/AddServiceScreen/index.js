import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

// constants
import {Colors} from '../../config/constants/Color';
// component
import {HeaderBackArrow} from '../../components/Headers';
import normalize from 'react-native-normalize';

const AddServiceScreen = () => {
  return (
    <View style={styles.container}>
      <HeaderBackArrow title="ADD SERVICE" />
      <View style={styles.innerContainer}>
        <Text>AddServiceScreen</Text>
        <View style></View>
      </View>
    </View>
  );
};

export default AddServiceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  innerContainer: {
    paddingHorizontal: normalize(32),
  },
});
