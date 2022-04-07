const { User } = require('../models/userModels.js');

const userController = {}

userController.createUser = (req, res, next) => {
  console.log('CREATE USER FIRED');
  const { username, password, name } = req.body;
  User.create({username, password, name})
  .then(result => {
    console.log(result);
    res.locals.id = result._id;
    res.locals.name = result.name;
    next();
  })
  .catch(err => next({
    log: 'createUser middleware error',
    status: 400,
    message: { err }, 
  }));
}

userController.getAllUsers = (req, res, next) => {
  console.log('GET ALL USERS FIRED');
  User.find({})
  .then (users => {
    res.locals.users = users;
    return next();
  })
  .catch(err => next({
    log: 'getAllUsers middleware error',
    status: 400,
    message: { err }, 
  })
  )
}



userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username })
    .then((result) => {
      if (!result) {
        return next({
          log: 'no result',
          status: 400,
          message: { err }, 
        })
      }
      res.locals.id = result._id;
      res.locals.name = result.name;
      result.comparePassword(password, function (err, isMatch) {
        if (err) {
          return next({
            log: 'comparePassword error',
            status: 400,
            message: { err }, 
          });
        } else {
          if (isMatch) {
            console.log('successful login');
            return next();
          } else {
            return next({
              log: 'wrong password',
              status: 400,
              message: { err }, 
            });
          }
        }
      });
    })
    .catch((err) => {
      return next({
        log: 'cant find username error',
        status: 400,
        message: { err }, 
      });
    });
};

module.exports = userController;
