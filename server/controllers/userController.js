const { User } = require('../models/userModels.js');

const userController = {}

// Create a new student in the Database
// Their information will be sent in the request body
// This should send the created student
userController.createUser = (req, res, next) => {
  console.log('CREATE USER FIRED');
  const { username, password } = req.body;
  User.create(req.body)
  // console.log(req.body)
  .then(result => {
    console.log(result);
    res.locals.id = result._id;
    next();
  })
  .catch(err => next({
    log: 'createUser middleware error',
    status: 400,
    message: { err }, 
  }));
}

// Get a student from the database and send it in the response
// Their first name will be in the request parameter 'name'
// This should send the found student
userController.getAllUsers = (req, res, next) => {
  console.log('GET ALL USERS FIRED');
  User.find({})
  .then (users => {
    // store retrieved users into res.locals and move on to next middleware
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

userController.getAllFriends = (req, res, next) => {
  console.log('GET ALL FRIENDS FIRED');
  const { id } = req.body
  User.findOne({_id: id})
  .then (user => {
    console.log(user)
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

userController.verifyUser = (req, res, next) => {
  // write code here
  const { username, password } = req.body; // {username: testing, password: password}
  console.log(username, password);
  User.findOne({ username })
    .then((result) => {
      if (!result) {
        // console.log('result falsey');
        return next({
          log: 'no result',
          status: 400,
          message: { err }, 
        })
      }
      console.log('database password', result._doc.password);
      res.locals.id = result._id;
      result.comparePassword(password, function (err, isMatch) {
        if (err) {
          // console.log('comparePassword err');
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
            // console.log('isMatch false');
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
      // console.log('findOne err');
      return next({
        log: 'cant find username error',
        status: 400,
        message: { err }, 
      });
    });
};

// // Get a student from the database and update the student
// // The student's first name will be in the request parameter 'name'
// // The student's new first name will be in the request body
// updateUser(req, res, next) {

// },

// // Delete a student from the database
// // The student's first name will be sent in the request parameter 'name'
// // This should send a success status code
// deleteUser(req, res, next) {

// },

module.exports = userController;
