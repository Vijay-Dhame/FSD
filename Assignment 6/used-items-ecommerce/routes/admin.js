const express = require('express');
const { getAdminDashboard, getAdminItems, updateItemStatus, getAdminUsers } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', getAdminDashboard);
router.get('/items', getAdminItems);
router.post('/items/:id/status', updateItemStatus);
router.get('/users', getAdminUsers);

module.exports = router;
