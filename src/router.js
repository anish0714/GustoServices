import React from 'react';
//proptypes
import PropTypes from 'prop-types';
//REDUX
import {connect} from 'react-redux';
//react native components
import {Image, Platform, SafeAreaView, View, StyleSheet} from 'react-native';
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
import AddServiceAdminScreen from './screens/AddServiceScreen/AddServiceAdminScreen';
import AddServiceVendorScreen from './screens/AddServiceScreen/AddServiceVendorScreen';
import CalendarScreen from './screens/CalendarScreen';
import CreateServiceScreen from './screens/CreateServiceScreen';
import DisplayServiceScreen from './screens/ServiceScreen/DisplayServiceScreen';
import DisplayServiceCustomerScreen from './screens/ServiceScreen/DisplayServiceCustomerScreen';
import ServiceDetailScreen from './screens/ServiceScreen/ServiceDetailScreen';
import CustomerServiceDetailScreen from './screens/ServiceScreen/CustomerServiceDetailScreen';
// category
import AddCategoryScreen from './screens/AddCategoryScreen';
// schedule
import EditScheduleScreen from './screens/ScheduleScreen/EditScheduleScreen';
import CustomerScheduleScreen from './screens/ScheduleScreen/CustomerScheduleScreen';
// vendor
import DisplayVendors from './screens/DisplayVendors/DisplayVendors';
// book service
import BookServiceScreen from './screens/BookServiceScreen';
// success screen
import SuccessScreen from './screens/SuccessScreen';
// search
import SearchScreen from './screens/SearchScreen';
// payment
import PaymentScreen from './screens/PaymentScreen/PaymentScreen';
import AddPaymentDetailsScreen from './screens/PaymentScreen/AddPaymentDetailsScreen';
import CardSelectionBeforeBooking from './screens/PaymentScreen/CardSelectionBeforeBooking';
// receipt
import ViewReceiptScreen from './screens/ViewReceiptScreen';

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
      <Stack.Screen name="addServiceAdmin" component={AddServiceAdminScreen} />
      <Stack.Screen
        name="addServiceVendor"
        component={AddServiceVendorScreen}
      />
      <Stack.Screen name="calendarScreen" component={CalendarScreen} />
      <Stack.Screen name="createService" component={CreateServiceScreen} />
      <Stack.Screen name="displayServices" component={DisplayServiceScreen} />
      <Stack.Screen
        name="displayCustomerServices"
        component={DisplayServiceCustomerScreen}
      />
      <Stack.Screen name="serviceDetail" component={ServiceDetailScreen} />
      <Stack.Screen
        name="customerServiceDetail"
        component={CustomerServiceDetailScreen}
      />
      {/* category */}
      <Stack.Screen name="categoryScreen" component={AddCategoryScreen} />
      {/* schedule */}
      <Stack.Screen name="editSchedule" component={EditScheduleScreen} />
      <Stack.Screen
        name="customerSchedule"
        component={CustomerScheduleScreen}
      />
      {/* vendor */}
      <Stack.Screen name="displayVendors" component={DisplayVendors} />
      {/* book service */}
      <Stack.Screen name="bookService" component={BookServiceScreen} />
      {/* success screen */}
      <Stack.Screen name="successScreen" component={SuccessScreen} />
      {/* search screen */}
      <Stack.Screen name="searchScreen" component={SearchScreen} />
      {/* payment */}
      <Stack.Screen name="paymentScreen" component={PaymentScreen} />
      <Stack.Screen
        name="addPaymentDetails"
        component={AddPaymentDetailsScreen}
      />
      <Stack.Screen
        name="cardSelectionBeforeBooking"
        component={CardSelectionBeforeBooking}
      />
      {/* view Receipt */}
      <Stack.Screen name="viewReceipt" component={ViewReceiptScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
