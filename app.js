const express = require('express');
const app = express();
const session = require('express-session');
var bodyParser = require('body-parser')
const methodoverride = require('method-override');
const booksRouter = require('./src/routes/bookRoutes');
const loginRouter = require('./src/routes/loginRoutes');
const signupRouter = require('./src/routes/signupRoutes');
const adminRouter = require('./src/routes/adminroutes');
const admin1Router = require('./src/routes/admin1routes');
const authorRouter = require('./src/routes/authorroutes');
var fs = require('fs');
var path = require('path');
require('dotenv/config');
var mongoose = require('mongoose')



const port = process.env.PORT || 2000;

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'ssshhhhh', resave: true, saveUninitialized: true }));
app.use(express.static('./public'));
app.use('/uploads', express.static('uploads'))
var imgModel = require('./src/model/fileschema');

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(methodoverride('_method'));
app.use('/books', booksRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/admin', adminRouter);
app.use('/admin1', admin1Router);
app.use('/authors', authorRouter);


app.get('/', function (req, res) {
  res.render('index', {
    nav: [
      { link: '/', name: 'Home' },
      { link: '/login', name: 'login' },
      { link: '/signup', name: 'signup' }      
    ],
    title: 'Library'
  });
});

app.listen(port , ()=> {
  console.log('Server ready at' + port)
  
});
