import {
  LOG_OUT,
  SET_LOADING,
  SET_TOAST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  RETURN_STATE,
  SHOW_APP,
  REGISTER,
  SHOW_HOME,
  SHOW_LOGIN,
} from './types';
import axios from 'axios';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// config
import {API_URL, END_POINTS} from '../config/constants/API';

export const handleLogout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('user_token');

    dispatch({
      type: LOG_OUT,
    });
  } catch (err) {
    console.log('Error in logout', err);
  }
};

export const handleLogin = (email, password) => async dispatch => {
  dispatch(setLoading());
  let invalidMessage = '';
  if (email.trim().length < 1 || password.trim().length < 1) {
    if (email.trim().length < 1) {
      invalidMessage = 'Please enter email';
    } else {
      invalidMessage = 'Please enter password';
    }
    return dispatch({
      type: LOGIN_FAIL,
      payload: invalidMessage,
    });
  }
  let url = API_URL + END_POINTS.login;
  let payload = {
    email,
    password,
  };
  try {
    const res = await axios.post(url, payload);
    if (res) {
      if (res.data.statusCode === 0) {
        const {token, data} = res.data;
        console.log('token', token);
        await AsyncStorage.setItem('user_token', token);
        console.log('User Data', data);
        return dispatch({
          type: LOGIN_SUCCESS,
          payload: data,
        });
      }
      return dispatch({
        type: LOGIN_FAIL,
        payload: res.data.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const validateEmail = email => {
  var isValid = /\S+@\S+\.\S+/;
  return isValid.test(email);
};

export const handleRegister = payload => async dispatch => {
  console.log('PAYLOAD', payload);
  const {email, fullName, contactNumber, password, confirmfPassword, userType} =
    payload;
  let message = '';
  dispatch(setLoading());
  if (
    (email && email.trim().length < 1) ||
    (fullName && fullName.trim().length < 1) ||
    (contactNumber && contactNumber.trim().length < 1) ||
    (password && password.trim().length < 1) ||
    (confirmfPassword && confirmfPassword.trim().length < 1) ||
    userType.trim().length < 1
  ) {
    message = 'Please fill all the details';
  } else if (!validateEmail(email)) {
    message = 'pleasee enter valid a email id';
  } else if (password !== confirmfPassword) {
    message = "password and confirm password doesn't match";
  } else if (password.length < 6 || password.length > 15) {
    message = 'password length should be more than 6';
  } else {
    // let url = 'http://localhost:4000/user/register';
    let url = API_URL + END_POINTS.register;

    const data = {
      email,
      fullName,
      contactNumber,
      password,
      userType,
      address: '',
      bio: '',
      city: '',
      organizationName: '',
      postalCode: '',
    };

    try {
      const res = await axios.post(url, data);
      console.log('RESPONSE=', res);
      // if (res.data === 'User Added Successfully')
      // if(res.data.statusCode === )
      message = res.data.data;
      console.log('message', message);
    } catch (err) {
      console.log('Error', err);
      message = 'Server down please try it again later';
    }
  }
  dispatch({
    type: REGISTER,
    payload: message,
  });
};

export const handleLoggedIn = () => async dispatch => {
  const userOnboarding = await AsyncStorage.getItem('user_onboarding');
  let isShowUserOnboarding = true;
  const userToken = await AsyncStorage.getItem('user_token');
  // console.log('userToken', userToken);
  if (userOnboarding) {
    isShowUserOnboarding = false;
  }
  if (!userToken) {
    return dispatch({
      type: SHOW_LOGIN,
      payload: isShowUserOnboarding,
    });
  }
  console.log('x-auth-token', userToken);
  const headers = {
    'x-auth-token': userToken,
  };
  try {
    let url = API_URL + END_POINTS.loggedin;
    const res = await axios.post(
      url,
      {},
      {
        headers,
      },
    );
    const payload = {
      isShowUserOnboarding,
      userData: res.data,
    };
    console.log('Payload = ', payload);
    if (res.data.statusCode === 0 && res.data.user) {
      return dispatch({
        type: SHOW_HOME,
        payload: payload,
      });
    } else {
      return dispatch({
        type: SHOW_LOGIN,
        payload: payload,
      });
    }
  } catch (err) {
    return dispatch({
      type: SHOW_LOGIN,
      payload: {isShowUserOnboarding, userData: null},
    });
  }
};

//--------------------------------------------------------------show app---
export const showApp = () => async dispatch => {
  await AsyncStorage.setItem('user_onboarding', 'user_onboarded');
  dispatch({
    type: SHOW_APP,
  });
};
//--------------------------------------------------------------set toast---
export const setToast = () => {
  return {
    type: SET_TOAST,
  };
};
//--------------------------------------------------------------set loading---
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
