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
} from './types';
import axios from 'axios';
// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
// config
import {API_URL, END_POINTS} from '../config/constants/API';


export const handleLogin = (email, password) => async dispatch => {
  dispatch(setLoading());

  if (email.trim().length < 1 || password.trim().length < 1) {
    return dispatch({
      type: LOGIN_FAIL,
      payload: 'Incorrect Login or Password',
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
  const {
    email,
    fullName,
    contactNumber,
    password,
    address,
    confirmfPassword,
    userType,
  } = payload;
  let message = '';
  dispatch(setLoading());
  if (
    (email && email.trim().length < 1) ||
    (fullName && fullName.trim().length < 1) ||
    (contactNumber && contactNumber.trim().length < 1) ||
    (password && password.trim().length < 1) ||
    (address && address.trim().length < 1) ||
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

    try {
      const res = await axios.post(url, payload);
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

//--------------------------------------------------------------show app---
export const showApp = () => {
  return {
    type: SHOW_APP,
  };
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
