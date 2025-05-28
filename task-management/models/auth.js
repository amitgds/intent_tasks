const db = require('../config/database');
const bcrypt = require('bcryptjs');

// Register a new user
exports.registerUser = async function (userData, callback) {
    try {
        console.log(userData);
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        userData.password = hashedPassword;
        db.query('INSERT INTO user SET ?', userData, callback);
    } catch (err) {
        console.error(err);
        callback(err);
    }
};

// Login user by email
exports.getUserByEmail = function (email, callback) {
    db.query('SELECT * FROM user WHERE email = ?', [email], callback);
};

// Get user by ID
exports.getUserById = function (id, callback) {
    db.query('SELECT user_id, name, email FROM user WHERE user_id = ?', [id], callback);
};

// Save refresh token
exports.saveRefreshToken = function (userId, refreshToken, callback) {
    db.query('UPDATE user SET refresh_token = ? WHERE user_id = ?', [refreshToken, userId], callback);
};

// Get refresh token
exports.getRefreshToken = function (userId, callback) {
    db.query('SELECT refresh_token FROM user WHERE user_id = ?', [userId], callback);
};

// Reset password
exports.resetPassword = async function (email, newPassword, callback) {
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        db.query('UPDATE user SET password = ? WHERE email = ?', [hashedPassword, email], callback);
    } catch (err) {
        callback(err);
    }
};

// Check if email exists
exports.emailExists = function (email, callback) {
    db.query('SELECT COUNT(*) AS count FROM user WHERE email = ?', [email], callback);
};
