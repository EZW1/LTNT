const Session = require("../models/sessionModels");

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  if (req.cookies['ssid']) {
    Session.findOne({ cookieId: req.cookies['ssid'] }, (err, result) => {
      if (err) next(res.redirect('/login'));
      else {
        console.log('result._doc.cookieId', result._doc.cookieId);
        //see if res has the same value as the req cookies ssid
        //if it is, means session is still active/ user is authenticated
        if (result._doc.cookieId === req.cookies['ssid']) {
          console.log('ssid found');
          next();
        } else {
          console.log('ssid not found');
          res.redirect('/login');
        }
      }
    });
  } else {
    console.log('no ssid cookie in req header')
    res.redirect('/login');
  }
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = async (req, res, next) => {
  const session = await Session.findOne({ cookieId: res.locals.id })
  if (!session) {
    Session.create({ cookieId: res.locals.id })
      .then(() => next())
      .catch((err) => next({log: err, message: err}));
  } else {
    next();
  }
};

module.exports = sessionController;
