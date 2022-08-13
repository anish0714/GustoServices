import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WebView} from 'react-native-webview';
import {HeaderBackArrow} from '../../components/Headers';

const ViewReceiptScreen = ({route}) => {
  const {item} = route.params[0];
  console.log('itemitemitemitemitem', item);
  return (
  <>
  <HeaderBackArrow title="Receipt"/>
  <WebView source={{uri: item.receiptUrl}} />
  </>
  )
};

export default ViewReceiptScreen;

const styles = StyleSheet.create({});
