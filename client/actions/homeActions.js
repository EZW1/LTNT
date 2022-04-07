import axios from 'axios';
import * as types from '../constants/actionTypes.js';

export const syncFriends = (friends) => {
  return {
    type: types.SYNC_FRIENDS,
    payload: friends
  }
};

export const addFriend = (friend) => (dispatch) => {
  const { name, id, friends, frequency } = friend;
  axios.post('/addFriend', {name, id, friends, frequency})
    .then(response => {
      if (response.status === 200) dispatch({
        type: types.ADD_FRIEND,
        payload: response.data,
      });
    })
    .catch(console.error);
};