const { User } = require("../models/userModels");

const friendController = {};

friendController.getAllFriends = (req, res, next) => {
  const { id } = req.query
  User.findOne({_id: id})
  .then (user => {
    console.log(user.friends)
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
  friends = res.locals.friends;
  const { name, id } = req.body;
  friends.push({name});
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



module.exports = friendController;
