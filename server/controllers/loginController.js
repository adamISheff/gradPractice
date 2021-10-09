const { User, Comment, Session } = require('../models/models');


const loginController = {};


// Get User
loginController.getUser = (req, res, next) => {
  const { username } = req.body;

  User.find({ username }, (err, user) => {
    if(err) {
      return next({
        log: 'ERROR: loginController.getUser',
        err: {message: err.message}
      })
    }
    console.log('getUser retrieved: ', user[0]);
    res.locals.user = user[0];
    return next();
  })
}

// Create User
loginController.createUser = (req, res, next) => {
  // If there is already a user with that name:
  // Remove it from memory and move on
  if(res.locals.user) {
    delete res.locals.user;
    return next();
  }
  
  const { username, password } = req.body;
  const newUser = new User({ username, password });
  
  newUser.save((err, newUser)=>{
    if(err) {
      return next({
        log: 'ERROR: loginController.createUser',
        err: {message: err.message}
      })
    }
    res.locals.user = newUser;
    console.log('New User Created: ', res.locals.user);
    return next();
  });
}

// Verify User
loginController.verifyUser = (req, res, next) => {
  // If there was no user with that name found move on
  if(!res.locals.user) return next();

  const dbUser = res.locals.user;
  const reqUser = req.body;

  // If the password does not match remove the user from the response
  if(dbUser.password !== reqUser.password) delete res.locals.user;

  console.log(reqUser.username, 'password verified');
  return next();
}

// Set session cookie
loginController.setCookie = (req, res, next) => {
  if(!res.locals.user) return next();
  const user = res.locals.user;

  // Create a session for the user in the DB
  // Use the minutes variable to change length of session if desired
  const minutes = 60000;
  const userSession = new Session({
    username: user.username,
    expires: (Date.now() + (1 * minutes)),
    user: user._id
  })
  userSession.save((err, session) => {
    if(err) {
      return next({
        log: 'ERROR: loginController.setCookie',
        err: {message: err.message}
      })
    }
    console.log('Saved Session to DB: ', session);
    // Save cookie to the header with the user primary key
    res.cookie('SSID', user._id);
    return next();
  });
}

// Verify user session
loginController.verifySession = (req, res, next) => {
  
}

module.exports = loginController;