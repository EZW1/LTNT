import * as types from '../constants/actionTypes.js';

const initialState = {
  friends: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SYNC_FRIENDS: {
      return {
        ...state,
        friends: [...action.payload]
      }
    }

    // case types.ADD_FRIEND: {
    //   const newFriends = [...state.friends];
    //   newFriends.push(action.payload)
    //   return {
    //     ...state,
    //     friends: newFriends
    //   }
    // }

    default:
      return state;
  }
};

export default homeReducer;
