const { create } = require('handlebars');
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
    },

    checkUserName: (userName, callback) => {
        const query = 'SELECT * FROM user WHERE userName = ?';
        db.query(query, [userName], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    readUser: (userId, callback) => {
        const query = 'SELECT * FROM user LEFT JOIN readers ON user.userRole = 0 AND user.userID = readers.userID LEFT JOIN staff ON user.userRole != 0 AND user.userID = staff.userID WHERE user.userID = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    createUser: (userName, userPassword, userRole, callback) => {
        const query = 'INSERT INTO user (userName, userPassword, userRole) VALUES (?, ?, ?)';
        db.query(query, [userName, userPassword, userRole], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    deleteUser: (userId, callback) => {
        const query = 'DELETE FROM user WHERE userId = ?';
        db.query(query, [userId], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },

    updateUser: (userID, userName, userPassword, userRole, callback) => {
        const query = 'UPDATE user SET userName = ?, userPassword = ?, userRole = ? WHERE userId = ?';
        db.query(query, [userName, userPassword, userRole, userID], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results);
        });
    },
};

module.exports = User;