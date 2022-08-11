import {
  ADD_VENDOR_SERVICE_FAIL,
  SET_LOADING,
  ADD_VENDOR_SERVICE,
  SET_TOAST,
  GET_VENDOR_SERVICE,
  SET_BOOKING,
} from '../actions/types';

const initialState = {
  isLoading: false,
  isShowToast: false,
  showToastMessage: '',
  vendorData: [],
  isSuccess: false,
  bookingData: [],
  bookingOpenData: [],
};

export const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKING:
      return {
        ...state,
        isLoading: false,
        isShowToast: false,
        showToastMessage: '',
        bookingData: action.payload,
        bookingOpenData: action.payload.filter(item => item.status === 'open'),
      };
    case GET_VENDOR_SERVICE:
      return {
        ...state,
        isLoading: false,
        vendorData: action.payload,
      };
    case ADD_VENDOR_SERVICE:
      return {
        ...state,
        isLoading: false,
        isShowToast: true,
        showToastMessage: action.payload.message,
        isSuccess: true,
      };
    case ADD_VENDOR_SERVICE_FAIL:
      return {
        ...state,
        isLoading: false,
        isShowToast: true,
        showToastMessage: action.payload,
        isSuccess: false,
      };
    case SET_TOAST:
      return {
        ...state,
        isShowToast: false,
        showToastMessage: '',
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return {
        ...state,
      };
  }
};
