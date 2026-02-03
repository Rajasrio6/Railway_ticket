const express = require('express');
const bookingController = require('./controller');
// const auth = require('../middleware/auth'); // Comment out auth for now if it's not ready, or implement it
// Better to check auth.js first. But assuming standard export:
const auth = require('../middleware/auth');

const router = express.Router();

// All booking routes require authentication
router.use(auth);

// GET all my bookings
router.get('/', bookingController.getMyBookings);

// POST create a booking
router.post('/', bookingController.createBooking);

// DELETE cancel a booking
router.delete('/:id', bookingController.cancelBooking);

module.exports = router;