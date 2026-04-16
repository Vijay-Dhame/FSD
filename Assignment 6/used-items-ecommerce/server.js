const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// User auth middleware for EJS locals
app.use(async (req, res, next) => {
    res.locals.user = null;
    if (req.cookies && req.cookies.token) {
        try {
            const jwt = require('jsonwebtoken');
            const User = require('./models/User');
            if (req.cookies.token !== 'none') {
                const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
                res.locals.user = await User.findById(decoded.id);
            }
        } catch (err) {}
    }
    next();
});

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'partials/layout'); // Use layout.ejs

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/items', require('./routes/items'));
app.use('/user', require('./routes/user'));
app.use('/admin', require('./routes/admin'));

app.get('/', (req, res) => {
    res.render('index', { title: 'Home - Used Items Portal' });
});

// Error handling middleware
const errorHandler = require('./middleware/error');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
