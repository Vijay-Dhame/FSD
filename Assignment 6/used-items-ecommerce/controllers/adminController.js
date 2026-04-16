const User = require('../models/User');
const Item = require('../models/Item');

// @desc    Admin dashboard
// @route   GET /admin/dashboard
exports.getAdminDashboard = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const itemCount = await Item.countDocuments();
        const pendingItemsCount = await Item.countDocuments({ status: 'pending' });

        res.render('admin/dashboard', {
            title: 'Admin Dashboard',
            stats: { userCount, itemCount, pendingItemsCount }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all items for admin
// @route   GET /admin/items
exports.getAdminItems = async (req, res) => {
    try {
        const items = await Item.find().populate('seller', 'name email').sort('-createdAt');
        res.render('admin/items', { title: 'Manage Items', items });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Update item status
// @route   POST /admin/items/:id/status
exports.updateItemStatus = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).send('Item not found');
        }

        item.status = req.body.status; // status passed from form
        await item.save();

        res.redirect('/admin/items');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Get all users
// @route   GET /admin/users
exports.getAdminUsers = async (req, res) => {
    try {
        const users = await User.find().sort('-createdAt');
        res.render('admin/users', { title: 'Manage Users', users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
