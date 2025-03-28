const express = require('express');
const router = express.Router();

const books = require('../controller/HomeController');
const bookdetail = require('../controller/BookdetailController');

router.get('/home/book/:id', bookdetail.getBookDetails);
router.get('/home/search', books.SearchBooks);
router.get('/home', books.getBooks);
router.get('/', books.getBooks);

module.exports = router;
