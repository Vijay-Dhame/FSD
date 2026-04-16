const Feedback = require('../models/Feedback');

// Add new feedback
exports.addFeedback = async (req, res) => {
  try {
    const { subject, rating, comments } = req.body;

    const newFeedback = new Feedback({
      userId: req.user.id,
      subject,
      rating,
      comments,
    });

    const feedback = await newFeedback.save();
    res.status(201).json(feedback);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all feedback with optional filters
exports.getFeedbacks = async (req, res) => {
  try {
    const { subject, rating } = req.query;
    
    // Build query object
    const query = {};
    if (subject) query.subject = { $regex: subject, $options: 'i' };
    if (rating) query.rating = rating;

    const feedbacks = await Feedback.find(query)
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
      
    res.status(200).json(feedbacks);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single feedback
exports.getFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate('userId', 'name email');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.status(200).json(feedback);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    // Make sure user owns feedback or can handle admin roles here
    // For now allow owners to delete
    if (feedback.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized to delete this feedback' });
    }

    await feedback.deleteOne();
    res.status(200).json({ message: 'Feedback removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};
