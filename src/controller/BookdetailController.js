// controllers/bookController.js

const Book = require('../models/bookmodel');

const getBookDetails = (req, res) => {
  const bookId = req.params.id; // Lấy ID từ URL parameter

  Book.getBookDetails(bookId, (err, book) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching book details'+ err.stack});
    }

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // res.json(book);
    res.render('bookdetail', { result : book });
  });
};

module.exports = {
  getBookDetails,
};
