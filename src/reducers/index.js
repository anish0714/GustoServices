import {combineReducers} from 'redux';
import {authReducer} from './authReducer';
import {categoryReducer} from './categoryReducer';

export default combineReducers({
  authReducer: authReducer,
  categoryReducer: categoryReducer,
});
