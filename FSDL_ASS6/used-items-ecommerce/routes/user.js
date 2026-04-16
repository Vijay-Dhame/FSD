const express = require('express');
const { getDashboard, toggleWishlist } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.get('/dashboard', getDashboard);
router.post('/wishlist/:itemId', toggleWishlist);

module.exports = router;
