import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {Colors} from '../../config/constants/Color';
import {commonStyles} from '../../config/constants/Style';
import normalize from 'react-native-normalize';

export const BottomSheet = props => {
  return (
    <View style={styles.container}>
      <RBSheet
        ref={props.refRBSheet}
        animationType={'fade'}
        height={normalize(150)}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            paddingHorizontal: 16,
            borderTopLeftRadius: 8,
            borderTopEndRadius: 8,
            backgroundColor: Colors.darkBlue,
          },
          draggableIcon: {backgroundColor: Colors.white},
        }}>
        <TouchableOpacity
          onPress={props.setCustomer}
          style={styles.optionContainer}>
          <Text style={styles.textStyle}>customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.setVendor}
          style={styles.optionContainer}>
          <Text style={styles.textStyle}>vendor</Text>
        </TouchableOpacity>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grey,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: normalize(16),
  },
  textStyle: {
    ...commonStyles.boldText,
    color: Colors.white,
  },
});
