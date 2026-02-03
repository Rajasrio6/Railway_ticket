import express from 'express';
import * as trainController from './controller.js';

const router = express.Router();

// GET all trains
router.get('/', trainController.getAllTrains);

// POST search trains
router.post('/search', trainController.searchTrains);

// GET recommended trains
router.get('/recommended', trainController.getRecommendedTrains);

export default router;