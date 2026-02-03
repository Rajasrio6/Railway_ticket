import express from 'express';
import * as bookingController from './controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// All booking routes require authentication
router.use(auth);

// GET all my bookings
router.get('/', bookingController.getMyBookings);

// POST create a booking
router.post('/', bookingController.createBooking);

// DELETE cancel a booking
router.delete('/:id', bookingController.cancelBooking);

export default router;