import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {categoryReducer} from './categoryReducer';
import {vendorReducer} from './vendorReducer';

export default combineReducers({
  authReducer: authReducer,
  categoryReducer: categoryReducer,
  vendorReducer: vendorReducer,
});
