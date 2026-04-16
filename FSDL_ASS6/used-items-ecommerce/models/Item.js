const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title can not be more than 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [1000, 'Description can not be more than 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Cars', 'Bikes', 'Electronics', 'Furniture', 'Other']
    },
    imageUrl: {
        type: String,
        default: 'no-photo.jpg'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'sold'],
        default: 'pending'
    },
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Item', itemSchema);
