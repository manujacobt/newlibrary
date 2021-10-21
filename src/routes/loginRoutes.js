const express = require('express');
const loginRouter = express.Router();
const UserModel = require('../model/user.model');

loginRouter.get('/', function (req, res) {
  res.render('login', {
    nav: [
      { link: '/', name: 'Home' },
      { link: '/login', name: 'Login' },
      { link: '/signup', name: 'Signup' }
    ],
    title: 'Library',
    error:''
  });
});

loginRouter.post('/', async (req, res) => {
  const usr = req.body.username
  console.log(usr)
  
  const sess = req.session;
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username }); 
  if(user===null){
   
    res.render('login', {
      nav: [
        { link: '/', name: 'Home' },
        { link: '/login', name: 'Login' },
        { link: '/signup', name: 'Signup' }
      ],
      title: 'Library',
      error: 'User does not exist '
    });
  }
  else{
  sess.username = user.username;
  sess.role = user.role;

  if (user.password !== password) {
    res.render('login', {
      nav: [
        { link: '/', name: 'Home' },
        { link: '/login', name: 'Login' },
        { link: '/signup', name: 'Signup' }
      ],
      title: 'Library',
      error: 'User Exists and Invalid password '
    });
  }
  else {
  res.redirect('/books');
  }
}
});

module.exports = loginRouter;
