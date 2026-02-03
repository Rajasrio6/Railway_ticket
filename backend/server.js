const express = require('express');
const cors = require('cors');
const connectDB = require('./database/db');
require('dotenv').config();

// Import Routes
const trainRoutes = require('./trains/routes');
const historyRoutes = require('./history/routes');
const userRoutes = require('./users/routes');
const bookingRoutes = require('./bookings/routes');

const app = express();

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON data

// Connect to Database (Optional: uncomment once MongoDB is installed)
// connectDB();

// Use Routes
app.use('/api/trains', trainRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Railway Ticket API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});