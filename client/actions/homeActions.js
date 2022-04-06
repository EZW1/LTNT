import axios from 'axios';
import * as types from '../constants/actionTypes.js';

export const syncFriends = (friends) => {
  return {
    type: types.SYNC_FRIENDS,
    payload: friends
  }
};

// export const addFriend = (friend) => (dispatch) => {
//   const { name, ssid } = friend;
//   console.log(name, ssid);
//   axios.post('/tryLogin', {username, password})
//     .then(response => {
//       console.log('response data', response.data);
//       if (response.status === 200) dispatch({
//         type: types.ADD_FRIEND,
//         payload: response.data,
//       });
//     })
//     .catch(console.error);
// };