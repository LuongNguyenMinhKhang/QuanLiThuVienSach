const express = require('express');
const router = express.Router();

const books = require('../controller/HomeController');
const bookdetail = require('../controller/BookdetailController');

router.get('/home/book/:id', bookdetail.getBookDetails);
<<<<<<< HEAD
router.get('/home/search', books.SearchBooks);
=======
>>>>>>> 40bcc426c69195d0e67bbdb63def64dc681468ae
router.get('/home', books.getBooks);
router.get('/', books.getBooks);

module.exports = router;
