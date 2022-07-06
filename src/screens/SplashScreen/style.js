import {StyleSheet} from 'react-native';
import {Colors} from '../../config/constants/Color';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.darkBlue,
  },
  logo: {
    flex: 1,
    resizeMode: 'contain',
  },
});
