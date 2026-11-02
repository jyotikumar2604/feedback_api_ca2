const express = require('express');
const mongoose = require('mongoose');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/studentFeedback')
    .then(() => {
        console.log('MongoDB Connected');

        app.listen(3000, () => {
            console.log('Server running on port 3000');
        });
    })
    .catch(err => console.log(err));

// Feedback Routes
app.use('/api/feedback', feedbackRoutes);