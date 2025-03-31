const db = require('../config/database/dbconnect.js');

const Category = {
    // Hàm lấy tất cả danh mục, trả về qua callback
    getAllCategories: (callback) => {
        const query = 'SELECT * FROM categories';
        db.query(query, (err, results) => {
            if (err) {
                return callback(err, null); // Trả về lỗi qua callback
            }
            callback(null, results); // Trả về kết quả nếu không có lỗi
        });
    }
};

module.exports = Category;
