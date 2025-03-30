const { create } = require('handlebars');
const db = require('../config/database/dbconnect.js');

const borrowModel = {
    // Lấy tất cả các Borrow
    // Truy vấn tất cả các bản ghi trong bảng borrowings
    getAllBorrows: (callback) => {
        const query = 'SELECT * FROM borrowings';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Lấy tất cả Borrow của một Reader
    // Truy vấn các Borrow liên quan đến một Reader cụ thể dựa trên ReaderID
    getAllBorrowsByReader: (ReaderID, callback) => {
        const query = 'SELECT * FROM borrowings WHERE ReaderID = ?';
        db.query(query, [ReaderID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Lấy tất cả Borrow của một Staff
    // Truy vấn các Borrow liên quan đến một Staff cụ thể dựa trên staffID
    getAllBorrowsByStaff: (staffID, callback) => {
        const query = 'SELECT * FROM borrowings WHERE staffID = ?';
        db.query(query, [staffID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Lấy chi tiết BorrowDetails
    // Truy vấn chi tiết các sách trong BorrowDetails và liên kết với bảng books để lấy tên sách
    getAllBorrowDetails: (borrowID, callback) => {
        const query = `
            SELECT borrowdetail.BookID, books.Title AS BookName 
            FROM borrowdetail 
            INNER JOIN books ON borrowdetail.BookID = books.BookID 
            WHERE borrowdetail.BorrowID = ?`;
        db.query(query, [borrowID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Tạo một Borrow mới
    // Thêm một bản ghi mới vào bảng borrowings với ReaderID và trạng thái mặc định là 0
    createBorrow: (ReaderID, callback) => {
        const query = 'INSERT INTO borrowings (ReaderID, StaffID, Status) VALUES (?, 0, 0)';
        db.query(query, [ReaderID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Cập nhật thông tin Borrow
    // Cập nhật thông tin của một Borrow dựa trên BorrowID
    updateBorrow: (borrowID, ReaderID, staffID, status, callback) => {
        const query = 'UPDATE borrowings SET ReaderID = ?, StaffID = ?, status = ? WHERE BorrowID = ?';
        db.query(query, [ReaderID, staffID, status, borrowID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Cập nhật trạng thái Borrow
    // Cập nhật trạng thái của một Borrow (ví dụ: 0 = chưa mượn, 1 = đã mượn)
    updateBorrowStatus: (borrowID, status, callback) => {
        const query = 'UPDATE borrowings SET Status = ? WHERE BorrowID = ?';
        db.query(query, [status, borrowID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Cập nhật BorrowDetail
    // Cập nhật thông tin BorrowDetail dựa trên BorrowID và BookID
    updateBorrowDetail: (borrowID, BookID, callback) => {
        const query = 'UPDATE borrowdetail SET BookID = ? WHERE BorrowID = ?';
        db.query(query, [BookID, borrowID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Tạo một BorrowDetail mới
    // Thêm một bản ghi mới vào bảng borrowdetail với BorrowID và BookID
    createBorrowDetail: (borrowID, BookID, callback) => {
        const query = 'INSERT INTO borrowdetail (BorrowID, BookID) VALUES (?, ?)';
        db.query(query, [borrowID, BookID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Xóa một BorrowDetail
    // Xóa một bản ghi trong bảng borrowdetail dựa trên BorrowID và BookID
    deleteBorrowDetail: (borrowID, BookID, callback) => {
        const query = 'DELETE FROM borrowdetail WHERE BorrowID = ? AND BookID = ?';
        db.query(query, [borrowID, BookID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },

    // Xóa một Borrow
    // Xóa một bản ghi trong bảng borrowings dựa trên BorrowID
    deleteBorrow: (borrowID, callback) => {
        const query = 'DELETE FROM borrowings WHERE BorrowID = ?';
        db.query(query, [borrowID], (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi nếu có
            }
            callback(null, results); // Trả về kết quả nếu thành công
        });
    },
};

module.exports = borrowModel;