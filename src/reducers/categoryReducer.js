import {SET_CATEGORIES, SET_LOADING, SET_SERVICES} from '../actions/types';

const initialState = {
  isLoading: false,
  isShowToast: false,
  showToastMessage: '',
  categoryData: null,
  serviceData: null,
  selectedCategoryServiceData: null,
};

export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERVICES:
      const {data, categoryId} = action.payload;

      return {
        ...state,
        isLoading: false,
        serviceData: data,
        selectedCategoryServiceData: data.filter(
          serviceData => serviceData.categoryId === categoryId,
        ),
      };
    case SET_CATEGORIES:
      return {
        ...state,
        isLoading: false,
        categoryData: action.payload,
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
