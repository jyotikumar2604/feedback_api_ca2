const Feedback = require('../models/feedback');

 if (!studentName || !courseName || !message || !rating) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }
    if (!['Pending', 'Reviewed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }
exports.createFeedback = async (req, res) => {
  try {
    const { studentName, courseName, message, rating } = req.body;
    const feedback = new Feedback({ studentName, courseName, message, rating });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
