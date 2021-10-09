const express = require('express');
const router =  express.Router();
const loginController = require('../controllers/loginController');

// Request to register a user
router.post('/register', 
  loginController.getUser, 
  loginController.createUser, 
  loginController.setCookie, 
  (req, res, next) => {
    console.log('Finishing a request to register...');
    const user = res.locals.user;

    if(!user) res.status(400).redirect('/');

    res.status(200).redirect('/chatroom.html');
  })

// Request to login a user
router.post('/', 
  loginController.getUser,
  loginController.verifyUser,
  loginController.setCookie,
  (req, res, next) => {
    console.log('Finishing a request to login...');
    const user = res.locals.user;

    if(!user) res.status(400).redirect('/');

    res.status(200).redirect('/chatroom.html');
  })

module.exports = router;