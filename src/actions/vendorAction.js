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
      // console.log('RES>DATA \n');
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
  (
    serviceName,
    rate,
    userId,
    serviceId,
    selectedDate,
    scheduleTime,
    orgName,
    bio,
    location,
  ) =>
  async dispatch => {
    dispatch(setLoading());

  
    try {
      if (!serviceName) {
        return dispatch({
          type: ADD_VENDOR_SERVICE_FAIL,
          payload: 'Please enter service name',
        });
      } else if (!rate || rate === 0 || rate > 200) {
        return dispatch({
          type: ADD_VENDOR_SERVICE_FAIL,
          payload: 'Please enter the proper rate',
        });
      } else if (!orgName) {
        return dispatch({
          type: ADD_VENDOR_SERVICE_FAIL,
          payload: 'Please enter organization name for service',
        });
      } else if (!bio) {
        return dispatch({
          type: ADD_VENDOR_SERVICE_FAIL,
          payload: 'Please enter bio for service',
        });
      } else if (!location) {
        return dispatch({
          type: ADD_VENDOR_SERVICE_FAIL,
          payload: 'Please enter location for service',
        });
      } else {
        // const formData = new FormData();
        // formData.append('serviceName', serviceName);
        // formData.append('serviceId', serviceId);
        // formData.append('vendorId', userId);
        // formData.append('rate', rate);
        // formData.append('organizationName', orgName);
        // formData.append('bio', bio);
        // formData.append('location', location);
        // formData.append('serviceImage', {
        //   uri: asset.uri,
        //   name: asset.fileName,
        //   type: asset.type,
        // });
        // formData.append('schedule', [
        //   {
        //     date: selectedDate,
        //     timings: scheduleTime,
        //   },
        // ]);
        const PAYLOAD = {
          serviceName: serviceName,
          serviceId: serviceId,
          vendorId: userId,
          rate: rate,
          organizationName: orgName,
          bio: bio,
          location: location,
          schedule: [
            {
              date: selectedDate,
              timings: scheduleTime,
            },
          ],
        };
        // console.log('formData\n', PAYLOAD);

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
