const authModel = require('../models/auth');
const bcrypt = require('bcryptjs');
const { generateTokens } = require('../utils/genrateTokens');

exports.register = (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    authModel.emailExists(email, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Database error', error: err });
        }

        if (results[0].count > 0) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        authModel.registerUser({ name, email, password }, (err, results) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error registering user', error: err });
            }

            res.status(201).json({ success: true, message: 'User registered successfully' });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    authModel.getUserByEmail(email, async (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const tokens = generateTokens(user.user_id);
        authModel.saveRefreshToken(user.user_id, tokens.refreshToken, () => {
            res.json({
                success: true,
                message: 'Login successful',
                data: {
                    user: { id: user.user_id, name: user.name, email: user.email },
                    tokens
                }
            });
        });
    });
};

exports.refresh = (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(401).json({ success: false, message: 'Token required' });
    }

    try {
        authModel.getRefreshToken(req.userId, (err, results) => {
            if (err || results[0]?.refresh_token !== refreshToken) {
                return res.status(403).json({ success: false, message: 'Invalid refresh token' });
            }

            const tokens = generateTokens(req.userId);
            authModel.saveRefreshToken(req.userId, tokens.refreshToken, () => {
                res.json({
                    success: true,
                    message: 'Token refreshed successfully',
                    data: tokens
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({ success: false, message: 'Invalid or expired refresh token', error: err.toString() });
    }
};

exports.getProfile = (req, res) => {
    authModel.getUserById(req.userId, (err, results) => {
        if (err || results.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, message: 'Profile fetched successfully', data: results[0] });
    });
};
