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

export const submitLogin = details => (dispatch) => {
  const { username, password } = details;
  console.log(username, password);
  axios.post('/tryLogin', {username, password})
    .then(({ status }) => {
      if (status === 200) dispatch({ type: types.SUBMIT_LOGIN });
    })
    .catch(console.error);
};

export const submitRegister = details => (dispatch) => {
  const { username, password } = details;
  console.log(username, password);
  axios.post('/createUser', {username, password})
    .then(({ status }) => {
      if (status === 200) dispatch({ type: types.SUBMIT_REGISTER });
    })
    .catch(console.error);
};