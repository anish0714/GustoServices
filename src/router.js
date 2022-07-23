import React from 'react';
//proptypes
import PropTypes from 'prop-types';
//REDUX
import {connect} from 'react-redux';
//react native components
import {Image, Platform, SafeAreaView, Text, StyleSheet} from 'react-native';
import normalize from 'react-native-normalize';
// constants
import {Colors} from './config/constants/Color';
import {fontFamily} from './config/constants/Style';
//Navigation -> Container/Bottom Tabs/Stack
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

import TabNavigator from './TabNavigator';

// SCREENS
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
//HomeScreens
import AdminHomeScreen from './screens/HomeScreen/AdminHomeScreen';
import VendorHomeScreen from './screens/HomeScreen/VendorHomeScreen';
import CustomerHomeScreen from './screens/HomeScreen/CustomerHomeScreen';
// profile
import ProfileScreen from './screens/ProfileScreen';
import EditScreen from './screens/EditScreen';
import AboutUs from './screens/AboutUs';
// services
import ServiceScreen from './screens/ServiceScreen';
import AddServiceScreen from './screens/AddServiceScreen';
import CalendarScreen from './screens/CalendarScreen';

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const RootNavigator = ({authReducer: {isSignedIn}}) => {
  return (
    <NavigationContainer>
      {isSignedIn ? <LandingScreenStack /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
RootNavigator.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps)(RootNavigator);

export const LandingScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={TabNavigator} />
      <Stack.Screen name="aboutUs" component={AboutUs} />
      <Stack.Screen name="editProfile" component={EditScreen} />
      {/* service */}
      <Stack.Screen name="addService" component={AddServiceScreen} />
      <Stack.Screen name="calendarScreen" component={CalendarScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
