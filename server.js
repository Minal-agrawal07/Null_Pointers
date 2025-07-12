// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile'); // New route
const contactRoutes = require('./routes/contact');
const requestRoutes = require('./routes/requests');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads')); // Serve uploaded images

// MongoDB connection
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/profile', profileRoutes); // Mount profile routes
app.use('/api/requests', requestRoutes);

// Fallback route (home page)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
