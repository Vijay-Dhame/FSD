const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
    let token;

    if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).render('auth/login', { error: 'Not authorized to access this route', title: 'Login' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        
        // Pass user to locals for EJS views
        res.locals.user = req.user;
        
        next();
    } catch (err) {
        return res.status(401).render('auth/login', { error: 'Not authorized to access this route', title: 'Login' });
    }
};

// Optional auth - check if user is logged in for view rendering without protecting the route
exports.optionalAuth = async (req, res, next) => {
    let token;
    
    if (req.cookies.token) {
        token = req.cookies.token;
    }
    
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            res.locals.user = user;
        } catch (err) {
            res.locals.user = null;
        }
    } else {
        res.locals.user = null;
    }
    next();
};

// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).send('User role is not authorized to access this route');
        }
        next();
    };
};
