import React from 'react';
import Spinner from 'react-native-loading-spinner-overlay';
import {Colors} from '../../config/constants/Color';
export const Loader = () => {
  return <Spinner visible={props.isLoading} color={Colors.darkBlue} />;
};
