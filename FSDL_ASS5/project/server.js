require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const packageRoutes = require('./routes/packageRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
// Use a local DB by default if URI is not provided.
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travel_agency';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', packageRoutes);
app.use('/', contactRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
