const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        const message = `Resource not found`;
        return res.status(404).render('items/show', { title: 'Error', error: message, item: null });
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        const message = 'Duplicate field value entered';
        return res.status(400).render('auth/register', { title: 'Error', error: message });
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(val => val.message).join(', ');
        return res.status(400).render('error', { title: 'Error', error: message });
    }

    res.status(err.statusCode || 500).render('index', {
        title: 'Error',
        error: err.message || 'Server Error'
    });
};

module.exports = errorHandler;
