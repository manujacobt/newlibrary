const express = require('express');
const adminRouter = express.Router();
const Bookdata = require('../model/Bookdata');


/* multer start */
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${+Date.now()}.${file.originalname.split('.')[1]}`
    );
  }
});

const upload = multer({ storage: storage });
const cpUpload = upload.fields([
   { name: 'image', maxCount: 1 }
]);
/* multer end */

adminRouter.get('/', function (req, res) {
  res.render('addbook', {
    nav: [
      { link: '/books', name: 'Books' },
      { link: '/authors', name: 'Authours' },
      { link: '/admin', name: 'Add Book' },
      { link: '/admin1', name: 'Add Author' },
      { link: '/', name: 'Log Out' }
    ],
    title: 'Library'
  });
});


/* check cpUpload */
adminRouter.post('/add', cpUpload, async (req, res) => {
  var item = {
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    image: req.files?.image[0].path,    
    pages: req.body.pages,
    lang: req.body.lang,
    trans: req.body.trans
  };
  await Bookdata.create(item);
  res.redirect('/books');
});
module.exports = adminRouter;
