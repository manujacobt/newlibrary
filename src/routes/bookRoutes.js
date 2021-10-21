const express = require('express');
const booksRouter = express.Router();
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



booksRouter.get('/', function (req, res) {
  const session = req.session;
  const nav = [
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authours' },
    { link: '/', name: 'Log Out' }
  ];

  if (session.role === 'admin') {
    nav.push(...[
      { link: '/admin', name: 'Add Book' },
      { link: '/admin1', name: 'Add Author' }
    ]);
  }

  Bookdata.find().then(function (books) {
    res.render('books', {
      nav,
      title: 'Library',
      books
    });
  });
});

booksRouter.get('/:id', function (req, res) {
  const id = req.params.id;
  const session = req.session;
  const role1= session.role;
  const nav = [
    { link: '/books', name: 'Books' },
    { link: '/authors', name: 'Authours' },
    { link: '/', name: 'Log Out' }
  ];
    
  Bookdata.findOne({ _id: id }).then(function (book) {
    res.render('book', {
      nav,
      role1,
      title: 'Library',
      book
    });
  });
});

booksRouter.get('/:id/edit', async (req,res) =>{
  try {
    const book = await Bookdata.findById(req.params.id)
    res.render('editbook', {book: book})
  }
  catch{
    res.redirect('/books')
  }
  })
  booksRouter.put('/:id',async (req,res) =>{
    let book
    try {
      book = await Bookdata.findById(req.params.id)   
      book.title = req.body.title   
      book.author = req.body.author   
      book.genre = req.body.genre
      book.pages = req.body.pages
      book.lang = req.body.lang 
      book.trans = req.body.trans
      await book.save()
      res.redirect(`/books/${book.id}`)
    }
    catch{
      if(book == null){
        res.redirect('/addbook')
      }
      else{
        res.render('editbook', 
        {book: book,
          ermsg: 'error in updating'
        })
      }   
    }
    })

    booksRouter.put('/:id/image', cpUpload, async (req,res) =>{
      let book
      try {
        book = await Bookdata.findById(req.params.id)   
        book.image = req.files?.image[0].path    
        
        await book.save()
        res.redirect(`/books/${book.id}`)
      }
      catch{
        if(book == null){
          res.redirect('/addbook')
        }
        else{
          res.render('editbook', 
          {book: book,
            ermsg: 'error in updating'
          })
        }   
      }
      })

    booksRouter.delete('/:id',async (req,res) =>{
      let book
      try {
        book = await Bookdata.findById(req.params.id)
         await book.remove()      
        res.redirect('/books')
      }
      catch{
        if(Bookdata == null){
          res.redirect('/addbook')
        }
        else{
          res.redirect('/books')
          }        
      }
      })

module.exports = booksRouter;
