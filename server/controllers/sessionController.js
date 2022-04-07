const Session = require("../models/sessionModels");

const sessionController = {};

/**
 * isLoggedIn - find the appropriate session for this request in the database, then
 * verify whether or not the session is still valid.
 */
sessionController.isLoggedIn = (req, res, next) => {
  // console.log(req.cookies.ssid)
  if (req.cookies.ssid) {
    Session.findOne({ cookieId: req.cookies.ssid }, (err, result) => {
      if (err) {
        console.log('error in findOne session')
        res.locals.sessionStatus = {isActiveSession: false}
        next();
      } else {
        //see if res has the same value as the req cookies ssid
        //if it is, means session is still active/ user is authenticated
        // if (result._doc.cookieId === req.cookies['ssid']) {
        // } else {
        if (result) res.locals.sessionStatus = {
          isActiveSession: result.cookieId === req.cookies.ssid,
          ssid: result.cookieId,
          
        };
        else res.locals.sessionStatus = {isActiveSession: false};
        // }
        next();
      }
    });
  } else {
    console.log('no ssid cookie in req header')
    res.locals.sessionStatus = {isActiveSession: false}
    next();
  }
};

/**
 * startSession - create and save a new Session into the database.
 */
sessionController.startSession = async (req, res, next) => {
  const session = await Session.findOne({ cookieId: res.locals.id }, { expireAfterSeconds: 20})
  if (!session) {
    Session.create({ cookieId: res.locals.id })
      .then(() => next())
      .catch((err) => next({log: err, message: err}));
  } else {
    next();
  }
};

module.exports = sessionController;
