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

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          // paddingBottom: normalize(4),
          borderRadius: normalize(8),
          // borderTopEndRadius: normalize(18),
          // borderTopStartRadius: normalize(18),

          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: Colors.darkBlue,
          // borderWidth: normalize(5),
          // borderColor: Colors.golden,
          position: 'absolute',
          // bottom: normalize(8),
          margin: normalize(8),
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

          // You can return any component that you like here!
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
        component={AdminScreenStack}
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

      <Tab.Screen
        name="SERVICE"
        component={AdminScreenStack}
        options={{
          tabBarLabel: ({focused}) => (
            <Text
              style={[
                styles.selectedText,
                {fontWeight: focused ? 'bold' : 'normal'},
              ]}>
              SERVICE
            </Text>
          ),
        }}
      />

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

//--------------------------------------------------------------HOME STACK-----
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

//--------------------------------------------------------------LANDING STACK-----

export const LandingScreenStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={TabNavigator} />
      <Stack.Screen name="aboutUs" component={AboutUs} />
      <Stack.Screen name="editProfile" component={EditScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  selectedText: {
    color: Colors.golden,
    fontSize: normalize(Platform.OS === 'android' ? 11 : 8),
    fontFamily: fontFamily.semi_bold,
    fontSize: normalize(14),
  },
});
