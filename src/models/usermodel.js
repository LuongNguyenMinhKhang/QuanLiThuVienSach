const db = require('../config/database/dbconnect.js');

const User = {
    checkLogin: (userName, userPassword, callback) => {
        const query = 'SELECT * FROM user WHERE userName = ? AND userPassword = ?';
        db.query(query, [userName, userPassword], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    }
};

module.exports = User;