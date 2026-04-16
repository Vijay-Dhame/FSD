const Item = require('../models/Item');

// @desc    Get all items (browse, search, paginate)
// @route   GET /items
exports.getItems = async (req, res) => {
    let query;

    // Build query object
    const reqQuery = { ...req.query };

    // Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit', 'keyword', 'category'];
    removeFields.forEach(param => delete reqQuery[param]);

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    query = JSON.parse(queryStr);

    // Only show approved items for regular users
    if (!req.user || req.user.role !== 'admin') {
        query.status = 'approved';
    }

    if (req.query.keyword) {
        query.title = { $regex: req.query.keyword, $options: 'i' };
    }

    if (req.query.category) {
        query.category = req.query.category;
    }

    let moongoseQuery = Item.find(query).populate('seller', 'name email');

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 9;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Item.countDocuments(query);

    moongoseQuery = moongoseQuery.skip(startIndex).limit(limit).sort('-createdAt');

    try {
        const items = await moongoseQuery;
        
        // Pagination result
        const pagination = {};
        if (endIndex < total) pagination.next = { page: page + 1, limit };
        if (startIndex > 0) pagination.prev = { page: page - 1, limit };

        res.render('items/index', {
            title: 'Browse Items',
            items,
            pagination,
            searchQuery: req.query
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Get single item
// @route   GET /items/:id
exports.getItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('seller', 'name email');
        if (!item) {
            return res.status(404).render('items/show', { title: 'Not Found', error: 'Item not found', item: null });
        }
        res.render('items/show', { title: item.title, item, error: null });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
};

// @desc    Render create item form
// @route   GET /items/new
exports.renderNewItem = (req, res) => {
    res.render('items/new', { title: 'Sell Item', error: null });
};

// @desc    Create new item
// @route   POST /items
exports.createItem = async (req, res) => {
    try {
        const { title, description, price, category } = req.body;
        
        let imageUrl = 'no-photo.jpg';
        if (req.file) {
            imageUrl = req.file.filename;
        }

        const item = await Item.create({
            title,
            description,
            price,
            category,
            imageUrl,
            status: 'approved', // Auto-approve so it shows up for buyers immediately
            seller: req.user.id
        });

        res.redirect('/items/' + item._id);
    } catch (err) {
        console.error(err);
        res.render('items/new', { title: 'Sell Item', error: err.message });
    }
};
