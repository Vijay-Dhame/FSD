const express = require('express');
const { getItems, getItem, renderNewItem, createItem } = require('../controllers/itemController');
const { protect, optionalAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

const router = express.Router();

router.route('/')
    .get(optionalAuth, getItems)
    .post(protect, upload.single('image'), createItem);

router.get('/new', protect, renderNewItem);

router.route('/:id')
    .get(optionalAuth, getItem);

module.exports = router;
