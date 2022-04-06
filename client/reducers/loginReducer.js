
import * as types from '../constants/actionTypes.js';

const initialState = {
  isLoginOpen: true, 
  isRegisterOpen: false,
  isActiveSession: false,
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SWITCH_TO_LOGIN:
      {
        return {isLoginOpen: true, isRegisterOpen: false}
      };

    case types.SWITCH_TO_REGISTER:
      {
        return {isLoginOpen: false, isRegisterOpen: true}
      };

    case types.SUBMIT_LOGIN:
      {
        
      }

    default:
      return state;
  }
};

export default mainReducer;
