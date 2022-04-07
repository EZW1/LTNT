const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 * require controllers
 */
const userController = require('./controllers/userController');
const friendController = require('./controllers/friendController');
const cookieController = require('./controllers/cookieController');
const sessionController = require('./controllers/sessionController');

/**
 * require routers
 */
// const apiRouter = require('./routes/api');


/**
 * handle parsing request body
 */
app.use(express.json());

/**
 * handle requests for static files
 */
app.use('/dist', express.static(path.join(__dirname, '../dist')));

/**
 * define route handlers
 */

// route handler to respond with main app
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'))
});

app.get('/testRoute',
  (req, res, next) => {
    console.log('test route');
    console.log(req.cookies.ssid);
    next();
  },
  (req, res) => {
    return res.status(200).json({test: 'hi'})
  }
)

app.get('/checkSession',
  sessionController.isLoggedIn,
  (req, res) => {
    return res.status(200).json(res.locals.sessionStatus)
  }
)

app.get('/getAllUsers', 
  userController.getAllUsers, 
  (req, res) => {
    return res.status(200).json(res.locals.users)
  }
);

app.get('/showFriends?:id', 
  friendController.getAllFriends, 
  (req, res) => {
    return res.status(200).json(res.locals.friends)
  }
);

app.post('/createUser', 
  userController.createUser, 
  (req, res) => {
    return res.status(200).json({
      isActiveSession: true,
      ssid: res.locals.id
    })
  }
);

app.post('/tryLogin', 
  userController.verifyUser,
  cookieController.setSSIDCookie, 
  sessionController.startSession,
  (req, res) => {
    return res.status(200).json({
      isActiveSession: true,
      ssid: res.locals.id,
    });
  }
);

app.post('/addFriend',
  friendController.addFriend,
  (req, res) => {
    return res.status(200).json(res.locals.updatedFriends)
  }
)


// catch-all route handler for any requests to an unknown route
app.use('*', (req, res) => res.sendStatus(404));

/**
 * configure express global error handler
 * 
 */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).send(errorObj.message);  // <-- missed return
});


/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
