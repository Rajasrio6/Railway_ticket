const express = require('express');
const cors = require('cors');
const { connectDB } = require('./database/db');
require('dotenv').config();

const trainRoutes = require('./trains/routes');
const bookingRoutes = require('./bookings/routes');
const userRoutes = require('./users/routes');
// const historyRoutes = require('./history/routes'); // keeping consistent with previous state

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();

// Routes
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Railway Ticket API is running...');
});

// Error handling middleware (imported if exists, or basic one)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, error: err.message || 'Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});