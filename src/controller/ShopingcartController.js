const borrow = require('../models/borrowmodel.js');
const User = require('../models/usermodel.js');

// Hiển thị giỏ hàng
const Shopingcart = async (req, res) => {
    try {
        // 1. Kiểm tra phiên người dùng
        const userID = req.session.userID;
        if (!userID) {
            return res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
        }

        // 2. Lấy ReaderID từ User
        const userResult = await new Promise((resolve, reject) => {
            User.readUser(userID, (err, result) => {
                if (err) return reject(err); // Xử lý lỗi nếu không lấy được dữ liệu
                resolve(result); // Trả về kết quả nếu thành công
            });
        });

        if (!userResult || userResult.length === 0) {
            return res.status(404).json({ error: 'User not found' }); // Trả về lỗi nếu không tìm thấy người dùng
        }
        const readerID = userResult[0].ReaderID;

        // 3. Lấy Borrow của Reader
        const borrowsResult = await new Promise((resolve, reject) => {
            borrow.getAllBorrowsByReader(readerID, (err, result) => {
                if (err) return reject(err); // Xử lý lỗi nếu không lấy được dữ liệu
                resolve(result); // Trả về kết quả nếu thành công
            });
        });

        if (!borrowsResult || borrowsResult.length === 0) {
            return res.render('shopingcart', { borrows: [] }); // Hiển thị giỏ hàng trống nếu không có Borrow nào
        }

        // Lấy BorrowID đầu tiên
        const borrowID = borrowsResult[0].BorrowID;

        // 4. Lấy BorrowDetails (chi tiết sách trong giỏ hàng)
        const borrowDetails = await new Promise((resolve, reject) => {
            borrow.getAllBorrowDetails(borrowID, (err, result) => {
                if (err) return reject(err); // Xử lý lỗi nếu không lấy được dữ liệu
                resolve(result); // Trả về kết quả nếu thành công
            });
        });

        if (!borrowDetails || borrowDetails.length === 0) {
            return res.render('shopingcart', { borrows: [] }); // Hiển thị giỏ hàng trống nếu không có BorrowDetails
        }

        // 5. Render giỏ hàng
        res.render('shopingcart', { borrows: borrowDetails });
    } catch (err) {
        console.error('Error in Shopingcart:', err); // Log lỗi nếu có
        res.status(500).json({ error: 'Internal server error' }); // Trả về lỗi server
    }
};

// Thêm sách vào giỏ hàng
const AddToCart = async (req, res) => {
    try {
        // 1. Lấy BookID từ body
        const bookID = req.body.BookID;
        if (!bookID) {
            return res.status(400).json({ error: 'Book ID is required' }); // Trả về lỗi nếu không có BookID
        }

        // 2. Kiểm tra phiên người dùng
        const userID = req.session.userID;
        console.log('USERID : ', userID );
        if (!userID) {
            return res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
        }

        // 3. Lấy ReaderID từ User
        const userResult = await new Promise((resolve, reject) => {
            User.readUser(userID, (err, result) => {
                if (err) return reject(err); // Xử lý lỗi nếu không lấy được dữ liệu
                resolve(result); // Trả về kết quả nếu thành công
            });
        });

        if (!userResult || userResult.length === 0) {
            return res.status(404).json({ error: 'User not found' }); // Trả về lỗi nếu không tìm thấy người dùng
        }
        const readerID = userResult[0].ReaderID;

        // 4. Kiểm tra Borrow của Reader
        const borrowsResult = await new Promise((resolve, reject) => {
            borrow.getAllBorrowsByReader(readerID, (err, result) => {
                if (err) return reject(err); // Xử lý lỗi nếu không lấy được dữ liệu
                resolve(result); // Trả về kết quả nếu thành công
            });
        });

        let borrowID;
        if (!borrowsResult || borrowsResult.length === 0) {
            // Nếu không có Borrow nào, tạo Borrow mới
            const newBorrowResult = await new Promise((resolve, reject) => {
                borrow.createBorrow(readerID, (err, result) => {
                    if (err) return reject(err); // Xử lý lỗi nếu không tạo được Borrow mới
                    resolve(result); // Trả về kết quả nếu thành công
                });
            });

            borrowID = newBorrowResult.insertId; // Lấy BorrowID của Borrow mới
            console.log('Created new BorrowID:', borrowID); // Log BorrowID mới
        } else {
            // Nếu đã có Borrow, sử dụng BorrowID đầu tiên
            borrowID = borrowsResult[0].BorrowID;
            console.log('Using existing BorrowID:', borrowID); // Log BorrowID hiện tại
        }

        // 5. Thêm sách vào BorrowDetails
        borrow.createBorrowDetail(borrowID, bookID, (err, result) => {
            if (err) {
                console.error('Error in AddToCart:', err); // Log lỗi nếu có
                return res.status(500).json({ error: 'Internal server error' }); // Trả về lỗi server
            }
            console.log('Book added to BorrowDetails:', result); // Log kết quả thêm sách
            // 6. Chuyển hướng đến giỏ hàng
            res.redirect('/shopingcart');
        });
    } catch (err) {
        console.error('Error in AddToCart:', err); // Log lỗi nếu có
        res.status(500).json({ error: 'Internal server error' }); // Trả về lỗi server
    }
};

// Xóa sách khỏi giỏ hàng
const DeleteFromCart = async (req, res) => {
    try {
        // 1. Lấy BookID từ body
        const bookID = req.body.BookID;
        if (!bookID) {
            return res.status(400).json({ error: 'Book ID is required' }); // Trả về lỗi nếu không có BookID
        }

        // 2. Kiểm tra phiên người dùng
        const userID = req.session.userID;
        if (!userID) {
            return res.redirect('/login'); // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
        }

        // 3. Lấy ReaderID từ User
        const userResult = await new Promise((resolve, reject) => {
            User.readUser(userID, (err, result) => {
                if (err) return reject(err); // Xử lý lỗi nếu không lấy được dữ liệu
                resolve(result); // Trả về kết quả nếu thành công
            });
        });

        if (!userResult || userResult.length === 0) {
            return res.status(404).json({ error: 'User not found' }); // Trả về lỗi nếu không tìm thấy người dùng
        }
        const readerID = userResult[0].ReaderID;

        // 4. Lấy Borrow của Reader
        const borrowsResult = await new Promise((resolve, reject) => {
            borrow.getAllBorrowsByReader(readerID, (err, result) => {
                if (err) return reject(err); // Xử lý lỗi nếu không lấy được dữ liệu
                resolve(result); // Trả về kết quả nếu thành công
            });
        });

        if (!borrowsResult || borrowsResult.length === 0) {
            return res.render('shopingcart', { borrows: [] }); // Hiển thị giỏ hàng trống nếu không có Borrow nào
        }
        const borrowID = borrowsResult[0].BorrowID;

        // 5. Xóa sách khỏi BorrowDetails
        borrow.deleteBorrowDetail(borrowID, bookID, (err, result) => {
            if (err) {
                console.error('Error deleting borrow detail:', err); // Log lỗi nếu có
                return res.status(500).json({ error: 'Internal server error' }); // Trả về lỗi server
            }
            // 6. Chuyển hướng đến giỏ hàng
            res.redirect('/shopingcart');
        });
    } catch (err) {
        console.error('Error in DeleteFromCart:', err); // Log lỗi nếu có
        res.status(500).json({ error: 'Internal server error' }); // Trả về lỗi server
    }
};

module.exports = {
    AddToCart,
    DeleteFromCart,
    Shopingcart
};
