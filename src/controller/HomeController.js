const Book = require('../models/bookmodel.js');

const getBooks = (req, res) => {
  Book.getAllBooks((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch books', results });
    }
    //res.status(200).json(results);
    res.render('home', { books : results});
  });
};

const createBook = (req, res) => {
  const bookData = req.body; 
  Book.createBook(bookData, (err, bookId) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create book' });
    }
    res.status(201).json({ message: 'Book created successfully', bookId });
  });
};

const updateBook = (req, res) => {
  const { id } = req.params;
  const bookData = req.body;
  Book.updateBook(id, bookData, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to update book' });
    }
    res.status(200).json({ message: 'Book updated successfully' });
  });
};

const deleteBook = (req, res) => {
  const { id } = req.params;
  Book.deleteBook(id, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete book' });
    }
    res.status(200).json({ message: 'Book deleted successfully' });
  });
};

module.exports = {
  getBooks,
  createBook,
  updateBook,
  deleteBook
};

