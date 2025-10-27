require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse JSON request bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Database Connection
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/fitnessdb';

console.log('Attempting to connect to MongoDB...');
mongoose.connect(dbURI)
    .catch(err => {
        console.log('MongoDB connection string:', dbURI.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, 'mongodb+srv://[username]:[password]@'));
        console.log('Full error:', err);
    })
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.log('MongoDB connection error:', err));

// API Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Simple root route to serve your main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});