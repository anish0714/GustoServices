import React, {useState} from 'react';
import {Button, Snackbar} from 'react-native-paper';
import {Colors} from '../../config/constants/Color';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  labelText: {
    color: Colors.white,
  },
  text: {
    color: Colors.white,
  },
  snackBar: {
    backgroundColor: Colors.darkBlue,
    // color: Colors.black,
    borderWidth: 1,
    borderColor: Colors.white,
    elevation: 10,
  },
});
export const ShowToast = props => {
  const [visible, setVisible] = useState(true);
  const onDismissSnackBar = () => setVisible(false);

  return (
    <Snackbar
      duration={5000}
      visible={visible}
      onDismiss={props.onDismiss}
      style={styles.snackBar}
      action={{
        labelStyle: styles.labelText,
        label: 'Dismiss',
        onPress: () => {
          onDismissSnackBar();
        },
      }}>
      <Text style={styles.text}>{props.message}</Text>
    </Snackbar>
  );
};
