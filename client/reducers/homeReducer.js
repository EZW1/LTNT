import * as types from '../constants/actionTypes.js';

const initialState = {
  friends: [],
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SYNC_FRIENDS: {
      // const newFriends = action.payload
      // const today = new Date();
      // const milliIn1Day = 86400000;

      // newFriends.map(friend => {
      //   const dateString = friend.followUp;
      //   console.log(dateString);
      //   const followUp = new Date(dateString + " ")
      //   console.log(followUp);
      //   const timeLeft = followUp - today
      //   console.log(timeLeft);
      //   // const humanDate = dateFormatter(Date.parse(friend.followUp))
      //   // console.log(friend.followUp);
      //   if (timeLeft < 0) friend.followUp = 'Overdue!';
      //   else if (timeLeft < milliIn1Day) friend.followUp = 'Today';
      //   else if (timeLeft < milliIn1Day * 2) friend.followUp = 'Tomorrow (${friend.followUp.slice(0,15)})';
      //   else if (timeLeft < milliIn1Day * 7) friend.followUp = `In ${Math.floor(timeLeft / milliIn1Day)} days (${friend.followUp.slice(0,15)})`;
      //   else if (timeLeft < milliIn1Day * 31) friend.followUp = `In ${Math.floor(timeLeft / (milliIn1Day*7) )} weeks (${friend.followUp.slice(0,15)})`;
      //   else friend.followUp = `In ${Math.floor(timeLeft / (milliIn1Day*30) )} months (${friend.followUp.slice(0,15)})`;
      // })
      return {
        ...state,
        friends: action.payload
      }
    }

    case types.ADD_FRIEND: {
      const newFriends = action.payload
      const today = new Date();
      const milliIn1Day = 86400000;

      newFriends.map(friend => {
        const timeLeft = Date.parse(friend.followUp) - today
        // const humanDate = dateFormatter(Date.parse(friend.followUp))
        if (timeLeft < 0) friend.followUp = 'Overdue!';
        else if (timeLeft < milliIn1Day) friend.followUp = 'Today';
        else if (timeLeft < milliIn1Day * 2) friend.followUp = 'Tomorrow';
        else if (timeLeft < milliIn1Day * 7) friend.followUp = `In ${Math.floor(timeLeft / milliIn1Day)} days`;
        else if (timeLeft < milliIn1Day * 31) friend.followUp = `In ${Math.floor(timeLeft / (milliIn1Day*7) )} weeks`;
        else friend.followUp = `In ${Math.floor(timeLeft / (milliIn1Day*30) )} months`;
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
