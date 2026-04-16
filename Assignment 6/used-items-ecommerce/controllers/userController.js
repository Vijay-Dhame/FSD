const Item = require('../models/Item');
const Wishlist = require('../models/Wishlist');

// @desc    Get user dashboard
// @route   GET /user/dashboard
exports.getDashboard = async (req, res) => {
    try {
        // Get user's items
        const myItems = await Item.find({ seller: req.user.id }).sort('-createdAt');

        // Get user's wishlist
        let wishlist = await Wishlist.findOne({ user: req.user.id }).populate('items');
        
        if (!wishlist) {
            wishlist = { items: [] };
        }

        res.render('user/dashboard', {
            title: 'My Dashboard',
            myItems,
            wishlistItems: wishlist.items
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Toggle wishlist item
// @route   POST /user/wishlist/:itemId
exports.toggleWishlist = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        let wishlist = await Wishlist.findOne({ user: req.user.id });

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: req.user.id,
                items: [itemId]
            });
        } else {
            // Check if item already in wishlist
            const index = wishlist.items.indexOf(itemId);
            if (index === -1) {
                // Add to wishlist
                wishlist.items.push(itemId);
            } else {
                // Remove from wishlist
                wishlist.items.splice(index, 1);
            }
            await wishlist.save();
        }

        res.redirect('back'); // Navigate back to the previous page
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};
