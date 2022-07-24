import React from 'react';
//proptypes
import PropTypes from 'prop-types';
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
// redux
import {connect} from 'react-redux';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
import AdminServiceScreen from './screens/ServiceScreen/AdminServiceScreen';
import AddServiceScreen from './screens/AddServiceScreen';
import CalendarScreen from './screens/CalendarScreen';

const TabNavigator = ({authReducer: {userData}}) => {
  const {userType} = userData;

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          // paddingBottom: normalize(4),
          // borderRadius: normalize(8),
          borderTopEndRadius: normalize(8),
          borderTopStartRadius: normalize(8),

          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.darkBlue,
          // borderColor: Colors.darkBlue,
          borderTopWidth: 2,
          // borderWidth: normalize(5),
          // borderColor: Colors.golden,
          // position: 'absolute',
          // bottom: normalize(8),
          margin: normalize(4),
          // fontSize: normalize(20)
        },
        tabBarIcon: ({focused, color, size}) => {
          let icon, height, width;
          if (route.name === 'HOME') {
            (height = normalize(27)), (width = normalize(27));
            icon = focused
              ? require('./assets/home_selected.png')
              : require('./assets/home.png');
          } else if (route.name === 'SERVICE') {
            (height = normalize(25)), (width = normalize(25));
            icon = focused
              ? require('./assets/task_selected.png')
              : require('./assets/task.png');
          } else if (route.name === 'SCHEDULE') {
            (height = normalize(20)), (width = normalize(20));
            icon = focused
              ? require('./assets/calendar_selected.png')
              : require('./assets/calendar.png');
          } else if (route.name === 'PROFILE') {
            (height = normalize(20)), (width = normalize(20));
            icon = focused
              ? require('./assets/profile-filled.png')
              : require('./assets/profile.png');
          }

          return (
            <Image
              style={{height: height, width: width, resizeMode: 'contain'}}
              source={icon}
            />
          );
        },
      })}>
      <Tab.Screen
        name="HOME"
        component={
          userType === 'customer'
            ? CustomerHomeScreenStack
            : userType === 'vendor'
            ? VendorHomeScreenStack
            : AdminScreenStack
        }
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.selectedText,
                {fontWeight: focused ? 'bold' : 'normal'},
              ]}>
              HOME
            </Text>
          ),
        }}
      />
      {/* AdminServiceScreen */}
      <Tab.Screen
        name="SERVICE"
        component={
          userType === 'customer'
            ? ServiceScreenStack
            : userType === 'vendor'
            ? ServiceScreenStack
            : AdminServiceScreenStack
        }
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.selectedText,
                {fontWeight: focused ? 'bold' : 'normal'},
              ]}>
              {userType === 'admin' ? 'VIEW SERVICES' : 'SERVICE'}
            </Text>
          ),
        }}
      />

      {userType === 'vendor' ||
        (userType === 'customer' && (
          <Tab.Screen
            name="SCHEDULE"
            component={AdminScreenStack}
            options={{
              tabBarLabel: ({focused}) => (
                <Text
                  style={[
                    styles.selectedText,
                    {
                      fontWeight: focused ? 'bold' : 'normal',
                      marginLeft: normalize(8),
                    },
                  ]}>
                  SCHEDULE
                </Text>
              ),
            }}
          />
        ))}

      <Tab.Screen
        name="PROFILE"
        component={ProfileScreenStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.selectedText,
                {fontWeight: focused ? 'bold' : 'normal'},
              ]}>
              PROFILE
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

TabNavigator.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(TabNavigator);

const styles = StyleSheet.create({
  selectedText: {
    color: Colors.golden,
    fontSize: normalize(Platform.OS === 'android' ? 11 : 8),
    fontFamily: fontFamily.semi_bold,
    fontSize: normalize(14),
  },
});

export const AdminScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={AdminHomeScreen} />
    </Stack.Navigator>
  );
};
export const AdminServiceScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={AdminServiceScreen} />
    </Stack.Navigator>
  );
};

export const VendorHomeScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={VendorHomeScreen} />
    </Stack.Navigator>
  );
};
export const CustomerHomeScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={CustomerHomeScreen} />
    </Stack.Navigator>
  );
};
export const ProfileScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export const ServiceScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={ServiceScreen} />
    </Stack.Navigator>
  );
};
