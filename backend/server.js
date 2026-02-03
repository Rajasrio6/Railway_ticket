import express from 'express';
import cors from 'cors';
import trainRoutes from './trains/routes.js';
import bookingRoutes from './bookings/routes.js';
import userRoutes from './users/routes.js';
import errorHandler from './middleware/error.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/trains', trainRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Railway Ticket API is running...');
});

// Error handling middleware (must be last)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});