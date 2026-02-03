const express = require('express');
const router = express.Router();
const trainsController = require('./controller');

// @route   GET /api/trains
// @desc    Search/Browse available trains with filters
router.get('/', trainsController.searchTrains);

// @route   GET /api/trains/:id
// @desc    Get details of a specific train flight
router.get('/:id', trainsController.getTrainById);

module.exports = router;