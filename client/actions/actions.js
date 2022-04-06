import axios from 'axios';
import * as types from '../constants/actionTypes.js';


export const switchToLogin = () => {
  return {
    type: types.SWITCH_TO_LOGIN
  }
};

export const switchToRegister = () => {
  return {
    type: types.SWITCH_TO_REGISTER
  }
};

export const submitDetails = details => (dispatch) => {
  const { username, password } = details;
  console.log(username, password);
  axios.post('/tryLogin', {username, password})
    .then(({ status }) => {
      if (status === 200) dispatch({ type: types.SUBMIT_DETAILS });
    })
    .catch(console.error);
};