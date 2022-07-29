import {
  LOG_OUT,
  SET_LOADING,
  SET_TOAST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  SET_USER,
  RETURN_STATE,
  SHOW_APP,
  REGISTER,
  SHOW_LOGIN,
  SHOW_HOME,
  UPDATE_PROFILE_PIC,
} from '../actions/types';

const initialState = {
  isSignedIn: false,
  isLoading: false,
  isShowToast: false,
  showToastMessage: '',
  isAppIntroSlider: true,
  userData: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_PIC:
      return {
        ...state,
        userData: action.payload,
        isLoading: false,
      };
    case LOG_OUT:
      return {
        ...state,
        isSignedIn: false,
        userData: null,
        isLoading: false,
        showToastMessage: '',
        isShowToast: false,
      };

    case SHOW_LOGIN:
      return {
        ...state,
        isLoading: false,
        isSignedIn: false,
        isAppIntroSlider: action.payload.isShowUserOnboarding,
        userData: null,
      };
    case SHOW_HOME:
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        isAppIntroSlider: action.payload.isShowUserOnboarding,
        userData: action.payload.userData.user,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSignedIn: true,
        isShowToast: true,
        showToastMessage: 'Login Successful',
        userData: action.payload,
      };
    case LOGIN_FAIL: {
      return {
        ...state,
        isLoading: false,
        isShowToast: true,
        showToastMessage: action.payload,
      };
    }
    case REGISTER:
      return {
        ...state,
        isLoading: false,
        isShowToast: true,
        showToastMessage: action.payload,
      };
    case SET_TOAST:
      return {
        ...state,
        isShowToast: false,
        showToastMessage: '',
      };
    case SHOW_APP:
      return {
        ...state,
        isAppIntroSlider: false,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return {
        ...state,
      };
  }
};
