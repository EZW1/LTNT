import { combineReducers } from 'redux';
import loginReducer from './loginReducer.js';
import homeReducer from './homeReducer.js';

export default combineReducers({
  login: loginReducer,
  home: homeReducer,
});
