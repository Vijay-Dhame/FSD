const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    const options = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    res.status(statusCode)
       .cookie('token', token, options)
       .redirect('/'); // Redirect to home after login/register
};

// @desc    Register user
// @route   POST /auth/register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.render('auth/register', { error: 'Email already exists', title: 'Register' });
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password
        });

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.render('auth/register', { error: err.message, title: 'Register' });
    }
};

// @desc    Login user
// @route   POST /auth/login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate email & password
        if (!email || !password) {
            return res.render('auth/login', { error: 'Please provide an email and password', title: 'Login' });
        }

        // Check for user
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.render('auth/login', { error: 'Invalid credentials', title: 'Login' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.render('auth/login', { error: 'Invalid credentials', title: 'Login' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.render('auth/login', { error: err.message, title: 'Login' });
    }
};

// @desc    Log user out / clear cookie
// @route   GET /auth/logout
exports.logout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.redirect('/');
};

// Page renders
exports.renderLogin = (req, res) => {
    res.render('auth/login', { title: 'Login', error: null });
};

exports.renderRegister = (req, res) => {
    res.render('auth/register', { title: 'Register', error: null });
};
