const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   POST api/feedback
// @desc    Add new feedback
// @access  Private
router.post('/', authMiddleware, feedbackController.addFeedback);

// @route   GET api/feedback
// @desc    Get all feedback
// @access  Public (or Private depending on requirements, prompt says "Users can view all feedback")
router.get('/', feedbackController.getFeedbacks);

// @route   GET api/feedback/:id
// @desc    Get single feedback
// @access  Public
router.get('/:id', feedbackController.getFeedback);

// @route   DELETE api/feedback/:id
// @desc    Delete feedback
// @access  Private
router.delete('/:id', authMiddleware, feedbackController.deleteFeedback);

module.exports = router;
