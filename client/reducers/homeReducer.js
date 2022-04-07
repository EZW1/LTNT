import * as types from '../constants/actionTypes.js';

const initialState = {
  friends: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SYNC_FRIENDS: {
      const newFriends = action.payload
      const today = new Date();
      const milliIn1Day = 86400000;

      newFriends.map(friend => {
        const timeLeft = Date.parse(friend.followUp) - today
        // const humanDate = dateFormatter(Date.parse(friend.followUp))
        if (timeLeft < 0) friend.timeLeft = 'Overdue!';
        else if (timeLeft < milliIn1Day/2) friend.timeLeft = 'Today';
        else if (timeLeft < milliIn1Day * 2) friend.timeLeft = 'Tomorrow';
        else if (timeLeft < milliIn1Day * 7) friend.timeLeft = `In ${Math.floor(timeLeft / milliIn1Day)} days`;
        else if (timeLeft < milliIn1Day * 31) friend.timeLeft = `In ${Math.floor(timeLeft / (milliIn1Day*7) )} weeks`;
        else friend.timeLeft = `In ${Math.floor(timeLeft / (milliIn1Day*30) )} months`;
      })

      return {
        ...state,
        friends: newFriends
      }
    }

    default:
      return state;
  }
};

export default homeReducer;
