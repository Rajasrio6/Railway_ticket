const express = require('express');
const router = express.Router();
const historyController = require('./controller');

// @route   GET /api/history
// @desc    Get all journey history
router.get('/', historyController.getHistory);

// @route   GET /api/history/:id
// @desc    Get specific history item details
router.get('/:id', historyController.getHistoryById);

module.exports = router;