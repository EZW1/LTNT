import * as types from '../constants/actionTypes.js';
import axios from 'axios';

const initialState = {
  isLoginOpen: true, 
  isRegisterOpen: false,
  isActiveSession: true,
  doneLoading: false,
  ssid: '',
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_TO_LOGIN:
      {
        return {
          ...state,
          isLoginOpen: true, 
          isRegisterOpen: false}
      };

    case types.SWITCH_TO_REGISTER:
      {
        return {
          ...state,
          isLoginOpen: false, 
          isRegisterOpen: true}
      };

    case types.UPDATE_SESSION:
      {
        return {
          ...state,
          doneLoading: true,
          isActiveSession: action.payload.isActiveSession,
          ssid: action.payload.ssid,
        }
      }

    default: 
      return state
  }
};

export default loginReducer;
