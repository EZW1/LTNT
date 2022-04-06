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
      if (status === 200) dispatch({ type: types.UPDATE_SESSION });
    })
    .catch(console.error);
};

export const submitRegister = details => (dispatch) => {
  const { username, password } = details;
  console.log(username, password);
  axios.post('/createUser', {username, password})
    .then(({ status }) => {
      if (status === 200) dispatch({ type: types.UPDATE_SESSION });
    })
    .catch(console.error);
};

export const checkSession = () => (dispatch) => {
  axios.get('/checkSession')
  .then(response => {
    console.log('done checkSession', response)
    dispatch({
      type: types.UPDATE_SESSION,
      payload: response.data.isActiveSession,
    })
  })
};

export const updateSession = (session) => {
  return {
    type: types.UPDATE_SESSION,
    payload: session,
  }
};