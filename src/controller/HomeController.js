const Book = require('../models/bookmodel.js');

const getBooks = (req, res) => {
  Book.getAllBooks((err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to fetch books', results });
    }
    //res.status(200).json(results);
    res.render('home', { books: results });
  });
};

const SearchBooks = (req, res) => {
  const keyword = req.query.search; // Lấy từ khóa từ URL

  if (!keyword) {
    console.log('Lỗi: Không có từ khóa tìm kiếm.');
    return res.redirect('/home'); // Nếu không có từ khóa, quay về trang chủ
  }

  console.log('Từ khóa tìm kiếm:', keyword);

  Book.searchBooks(keyword, (err, results) => { // Gọi hàm searchBooks đúng cách
    if (err) {
      console.error('Lỗi khi tìm kiếm sách:', err);
      return res.status(500).json({ error: 'Lỗi server' });
    }

    res.render('home', { books: results });
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
  SearchBooks,
  createBook,
  updateBook,
  deleteBook
};

