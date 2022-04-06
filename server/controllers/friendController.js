const { User } = require("../models/userModels");

const friendController = {};

friendController.addFriend = (req, res, next) => {
  console.log('ADD FRIEND FIRED');
  friends = res.locals.friends;
  const { name, id } = req.body;
  friends.push({name});
  console.log(friends);
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
