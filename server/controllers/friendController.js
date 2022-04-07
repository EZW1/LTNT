const { User } = require("../models/userModels");

const friendController = {};

friendController.getAllFriends = (req, res, next) => {
  const { id } = req.query;
  User.findOne({_id: id})
  .then (user => {
    // store retrieved users into res.locals and move on to next middleware
    res.locals.friends = user.friends;
    return next();
  })
  .catch(err => next({
    log: 'getAllUsers middleware error',
    status: 400,
    message: { err }, 
  })
  )
}

friendController.addFriend = (req, res, next) => {
  const { name, id, friends, frequency} = req.body;
  let date = new Date();
  switch(frequency) {
    case 'daily': 
      date.setDate(date.getDate() + 1)
      break
    case 'weekly': 
      date.setDate(date.getDate() + 7);
      break
    case 'biweekly': 
      date.setDate(date.getDate() + 14);
      break
    case 'monthly': 
      date.setMonth(date.getMonth() + 1);
      break
    case 'bimonthly': 
      date.setMonth(date.getMonth() + 2);
      break
    case 'quarterannually': 
      date.setMonth(date.getMonth() + 4);
      break
    case 'semiannually': 
      date.setMonth(date.getMonth() + 6);
      break
    case 'yearly': 
      date.setFullYear(date.getFullYear() + 1);
      break
    default: break;
  }
  friends.push({name, followUp: date, frequency});
  friends.sort((a, b) => Date.parse(a.followUp) - Date.parse(b.followUp))
  res.locals.updatedFriends = friends;

  User.updateOne({_id: id}, {
    $set: {friends}
  })
  .then (() => {
    return next();
  })
  .catch(err => next({
    log: 'addFriend middleware error',
    status: 400,
    message: { err }, 
  })
  )
};

friendController.deleteFriend = (req, res, next) => {
  const { friends, ssid, friendId } = req.body;
  let deletionIndex;
  for (let i = 0; i < friends.length; i++) {
    if (friends[i]._id === friendId) deletionIndex = i;
  }
  const newFriends = friends.slice(0,deletionIndex).concat(friends.slice(deletionIndex+1));
  res.locals.newFriends = newFriends;

  User.updateOne({_id: ssid}, {
    $set: {friends: newFriends}
  })
  .then (() => {
    return next();
  })
  .catch(err => next({
    log: 'addFriend middleware error',
    status: 400,
    message: { err }, 
  })
  )
};

friendController.editFriend = (req, res, next) => {
  const { friends, ssid, friendId, frequency } = req.body;

  let date = new Date();
  switch(frequency) {
    case 'daily': 
      date.setDate(date.getDate() + 1)
      break
    case 'weekly': 
      date.setDate(date.getDate() + 7);
      break
    case 'biweekly': 
      date.setDate(date.getDate() + 14);
      break
    case 'monthly': 
      date.setMonth(date.getMonth() + 1);
      break
    case 'bimonthly': 
      date.setMonth(date.getMonth() + 2);
      break
    case 'quarterannually': 
      date.setMonth(date.getMonth() + 4);
      break
    case 'semiannually': 
      date.setMonth(date.getMonth() + 6);
      break
    case 'yearly': 
      date.setFullYear(date.getFullYear() + 1);
      break
    default: break;
  }

  for (let i = 0; i < friends.length; i++) {
    console.log(friends[i]._id, friendId)
    if (friends[i]._id === friendId) {
      friends[i].frequency = frequency;
      friends[i].followUp = date;
    };
  }

  friends.sort((a, b) => Date.parse(a.followUp) - Date.parse(b.followUp))

  res.locals.updatedFriends = friends;

  User.updateOne({_id: ssid}, {
    $set: {friends}
  })
  .then (() => {
    return next();
  })
  .catch(err => next({
    log: 'addFriend middleware error',
    status: 400,
    message: { err }, 
  })
  )
};



module.exports = friendController;
