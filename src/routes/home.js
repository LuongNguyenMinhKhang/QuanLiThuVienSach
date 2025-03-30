const express = require('express');
const router = express.Router();

const books = require('../controller/HomeController');
const bookdetail = require('../controller/BookdetailController');

router.get('/home/book/:id', bookdetail.getBookDetails);
router.get('/home/result', books.SearchBooks);
router.get('/home', books.getHomeData);
router.get('/', books.getHomeData);

module.exports = router;
