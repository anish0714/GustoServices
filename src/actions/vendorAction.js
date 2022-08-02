import {
  ADD_VENDOR_SERVICE_FAIL,
  SET_LOADING,
  ADD_VENDOR_SERVICE,
  SET_TOAST,
  GET_VENDOR_SERVICE,
} from './types';
import axios from 'axios';
import {API_URL, END_POINTS} from '../config/constants/API';

export const getVendorService = vendorId => async dispatch => {
  dispatch(setLoading());
  const URL = API_URL + END_POINTS.getVendorsService;
  const PAYLOAD = {
    vendor_id: vendorId,
  };
  try {
    const res = await axios.post(URL, PAYLOAD);
    if (res) {
      console.log('RES>DATA \n');
      return dispatch({
        type: GET_VENDOR_SERVICE,
        payload: res.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

//---------
export const addVendorService =
  (serviceName, rate, userId, serviceId, selectedDate, scheduleTime) =>
  async dispatch => {
    dispatch(setLoading());
    const schedule = [
      {
        date: selectedDate,
        timings: scheduleTime,
      },
    ];
    console.log(
      `serviceName: ${serviceName}, 
      rate: ${rate},userId: ${userId}, 
      serviceId: ${serviceId}, 
      schedule: ${schedule}`,
    );
    try {
      if (!serviceName) {
        console.log('inside service name');
        return dispatch({
          type: ADD_VENDOR_SERVICE_FAIL,
          payload: 'Please enter service name',
        });
      } else if (!rate || rate === 0) {
        return dispatch({
          type: ADD_VENDOR_SERVICE_FAIL,
          payload: 'Please enter rate',
        });
      } else {
        const PAYLOAD = {
          serviceName: serviceName,
          serviceId: serviceId,
          vendorId: userId,
          rate: rate,
          schedule: [
            {
              date: selectedDate,
              timings: scheduleTime,
            },
          ],
        };

        const URL = API_URL + END_POINTS.addVendorService;
        const res = await axios.post(URL, PAYLOAD);
        dispatch({
          type: ADD_VENDOR_SERVICE,
          payload: res.data,
        });

        const response = await axios.post(
          API_URL + END_POINTS.getVendorsService,
          {
            vendor_id: userId,
          },
        );
        if (response) {
          console.log('RES>DATA \n');
          return dispatch({
            type: GET_VENDOR_SERVICE,
            payload: response.data,
          });
        }
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
