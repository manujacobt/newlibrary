const express = require('express');
const signupRouter = express.Router();
const UserData = require('../model/user.model');

signupRouter.get('/', function (req, res) {
  res.render('signup', {
    nav: [
      { link: '/', name: 'Home' },
      { link: '/login', name: 'Login' },
      { link: '/signup', name: 'Signup' }
    ],
    title: 'Library'
  });
});

signupRouter.post('/', async (req, res) => {
  const user = req.body;
  await UserData.create(user);
  res.redirect('/login');
});

module.exports = signupRouter;
