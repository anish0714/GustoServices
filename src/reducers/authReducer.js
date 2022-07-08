import {
  LOG_OUT,
  SET_LOADING,
  SET_TOAST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_USER,
  RETURN_STATE,
  SHOW_APP,
  REGISTER_FAIL,
  REGISTER_SUCCESSFUL,
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
    case REGISTER_SUCCESSFUL:
      return {
        ...state,
        isLoading: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
