const db = require('../config/database/dbconnect.js');

const Book = {
  getAllBooks: (callback) => {
    const query = 'SELECT * FROM books';
    db.query(query, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      // Chuyển đổi imageURL từ Buffer sang Base64
      const formattedBooks = results.map(book => {
        if (book.ImageURL) {
          book.ImageURL = `data:image/jpeg;base64,${Buffer.from(book.ImageURL).toString('base64')}`;
        }
        return book;
      });

      callback(null, formattedBooks);
    });
  },

  getBooksByCategory: (categoryID, callback) => {
    const query = 'SELECT * FROM books WHERE CategoryID = ?';
    db.query(query, [categoryID], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      // Chuyển đổi imageURL từ Buffer sang Base64
      const formattedBooks = results.map(book => {
        if (book.ImageURL) {
          book.ImageURL = `data:image/jpeg;base64,${Buffer.from(book.ImageURL).toString('base64')}`;
        }
        return book;
      });

      callback(null, formattedBooks);
    });
  },

  getBookDetails: (bookID, callback) => {
    const query = 'SELECT * FROM books WHERE bookID = ?';
    db.query(query, [bookID], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      const book = results[0];
      // Chuyển đổi imageURL từ Buffer sang Base64
      if (book && book.ImageURL) {
        book.ImageURL = `data:image/jpeg;base64,${Buffer.from(book.ImageURL).toString('base64')}`;
      }

      callback(null, book);
    });
  },

  createBook: (bookData, callback) => {
    const query = `
      INSERT INTO books (title, author, publisher, year, categoryID, status, price, quantity, imageURL, description)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const { title, author, publisher, year, categoryID, status, price, quantity, imageURL, description } = bookData;
    db.query(query, [title, author, publisher, year, categoryID, status, price, quantity, imageURL, description], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results.insertId);
    });
  },

  updateBook: (bookID, bookData, callback) => {
    const query = `
      UPDATE books
      SET title = ?, author = ?, publisher = ?, year = ?, categoryID = ?, status = ?, price = ?, quantity = ?, imageURL = ?, description = ?
      WHERE bookID = ?
    `;
    const { title, author, publisher, year, categoryID, status, price, quantity, imageURL, description } = bookData;
    db.query(query, [title, author, publisher, year, categoryID, status, price, quantity, imageURL, description, bookID], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  deleteBook: (bookID, callback) => {
    const query = 'DELETE FROM books WHERE bookID = ?';
    db.query(query, [bookID], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  searchBooks: (keyword, callback) => {
    const query = `SELECT * FROM books WHERE title LIKE ?`;
    const searchPattern = `%${keyword}%`;

    db.query(query, [searchPattern], (err, results) => {
      if (err) {
        return callback(err, null);
      }

      const formattedBooks = results.map(book => {
        if (book.ImageURL) {
          book.ImageURL = `data:image/jpeg;base64,${Buffer.from(book.ImageURL).toString('base64')}`;
        }
        return book;
      });

      callback(null, formattedBooks);
    });
  }
}

module.exports = Book;
