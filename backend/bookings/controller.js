import { bookings, trains } from '../database/db.js';

/**
 * Get all bookings (optionally filtered by user)
 */
export const getMyBookings = (req, res) => {
    try {
        // In a real app, we would filter by req.user.id
        // For now, return all formatted with train details
        const myBookings = bookings.map(b => {
            const train = trains.find(t => t.id === b.trainId);
            return { ...b, train };
        });
        res.status(200).json(myBookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};

/**
 * Create a new booking
 */
export const createBooking = (req, res) => {
    try {
        const { trainId } = req.body;
        const train = trains.find(t => t.id === trainId);

        if (!train) {
            return res.status(404).json({ message: "Train not found" });
        }

        if (train.seatsLeft <= 0) {
            return res.status(400).json({ message: "No seats left" });
        }

        const newBooking = {
            id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
            userId: req.user ? req.user.id : 1,
            trainId,
            status: "Upcoming",
            bookingDate: new Date().toISOString()
        };

        // Update seats (mock)
        train.seatsLeft -= 1;
        bookings.push(newBooking);

        res.status(201).json(newBooking);
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error: error.message });
    }
};

/**
 * Cancel a booking
 */
export const cancelBooking = (req, res) => {
    try {
        const { id } = req.params;
        const index = bookings.findIndex(b => b.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Return seat to train
        const train = trains.find(t => t.id === bookings[index].trainId);
        if (train) train.seatsLeft += 1;

        bookings.splice(index, 1);
        res.status(200).json({ message: "Booking cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling booking", error: error.message });
    }
};
