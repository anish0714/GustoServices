import {SET_CATEGORIES, SET_LOADING, SET_SERVICES} from './types';
import axios from 'axios';

import {API_URL, END_POINTS} from '../config/constants/API';

export const setServices = categoryId => async dispatch => {
  dispatch(setLoading());
  try {
    const url = API_URL + END_POINTS.getAllService;
    const res = await axios.get(url);
    // console.log(`$res.data : ${JSON.stringify(res.data)}`)

    if (res.data.statusCode === 0) {
      const payload = {
        categoryId,
        data: res.data.data,
      };
      console.log('PAYLOAD',payload);
      return dispatch({
        type: SET_SERVICES,
        payload: payload,
      });
    }
  } catch (err) {
    console;
    err.log(err);
  }
};

export const setCategories = () => async dispatch => {
  dispatch(setLoading());
  try {
    const url = API_URL + END_POINTS.getAllCategory;
    const res = await axios.get(url);
    if (res.data.statusCode === 0) {
      return dispatch({
        type: SET_CATEGORIES,
        payload: res.data.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
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
