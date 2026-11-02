const express = require('express');
const Feedback = require('../models/feedback');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { studentName, courseName, message, rating } = req.body;

        const feedback = new Feedback({
            studentName,
            courseName,
            message,
            rating
        });

        await feedback.save();

        res.status(201).json({
            message: 'Feedback submitted successfully',
            feedback
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// 2. GET - Retrieve Feedback with Pagination
router.get('/', async (req, res) => {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.max(1, parseInt(req.query.limit) || 5);

        const skip = (page - 1) * limit;

        const feedback = await Feedback.find()
            .skip(skip)
            .limit(limit);

        const totalRecords = await Feedback.countDocuments();

        res.status(200).json({
            currentPage: page,
            totalRecords,
            totalPages: Math.ceil(totalRecords / limit),
            feedback
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. PATCH - Update Feedback Status
router.patch('/:id', async (req, res) => {
    try {
        const { status } = req.body;

        if (!['Pending', 'Reviewed'].includes(status)) {
            return res.status(400).json({
                message: 'Status must be Pending or Reviewed'
            });
        }

        const feedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!feedback) {
            return res.status(404).json({
                message: 'Feedback not found'
            });
        }

        res.status(200).json({
            message: 'Feedback status updated successfully',
            feedback
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;