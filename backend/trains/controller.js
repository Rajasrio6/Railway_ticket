import { getTrains } from '../database/db.js';

/**
 * Get all available trains
 */
export const getAllTrains = (req, res) => {
    try {
        res.status(200).json(getTrains());
    } catch (error) {
        res.status(500).json({ message: "Error fetching trains", error: error.message });
    }
};

/**
 * Search trains based on criteria
 */
export const searchTrains = (req, res) => {
    try {
        const { from, to, date } = req.body;

        let filteredTrains = getTrains();

        if (from) {
            filteredTrains = filteredTrains.filter(t => t.origin.toLowerCase().includes(from.toLowerCase()));
        }

        if (to) {
            filteredTrains = filteredTrains.filter(t => t.destination.toLowerCase().includes(to.toLowerCase()));
        }

        res.status(200).json(filteredTrains);
    } catch (error) {
        res.status(500).json({ message: "Error searching trains", error: error.message });
    }
};

/**
 * Get recommended trains
 */
export const getRecommendedTrains = (req, res) => {
    try {
        const recommended = getTrains().filter(t => t.recommended === true);
        res.status(200).json(recommended);
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommended trains", error: error.message });
    }
};
