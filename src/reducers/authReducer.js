import {
  LOG_OUT,
  SET_LOADING,
  SET_TOAST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_USER,
  RETURN_STATE,
  SHOW_APP,
} from '../actions/types';

const initialState = {
  isSignedIn: false,
  isLoading: false,
  isShowToast: false,
  showToastMessage: '',
  isAppIntroSlider: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
      };
  }
};
