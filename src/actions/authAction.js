import {
  LOG_OUT,
  SET_LOADING,
  SET_TOAST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_USER,
  RETURN_STATE,
  SHOW_APP,
  REGISTER_SUCCESSFUL,
  REGISTER_FAIL,
} from './types';
import axios from 'axios';

import {API_URL, END_POINTS} from '../config/constants/API';

export const handleRegister = payload => async dispatch => {
  console.log('PAYLOAD', payload);
  dispatch(setLoading());
  // let url = 'http://localhost:4000/user/register';
  let url = API_URL + END_POINTS.register;

  try {
    // debugger;
    const res = await axios.post(url, payload);
    if (res.data === 'User Added Successfully')
      dispatch({
        type: REGISTER_SUCCESSFUL,
        payload: res.data,
      });
  } catch (err) {
    console.log('Error', err);
    // dispatch({
    //   type: REGISTER_FAIL,
    //   payload: res.data,
    // });
  }

  // dispatch({
  //   type:
  // })
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
