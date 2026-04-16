const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Item'
    }]
});

module.exports = mongoose.model('Wishlist', wishlistSchema);
