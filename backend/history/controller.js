/**
 * Controller for handling journey history requests
 */

// Mock data representing what would typically come from a database
const journeyHistory = [
    {
        id: "h1",
        year: "2025",
        from: "Amsterdam",
        to: "Brussels",
        route: "Amsterdam → Brussels",
        completedDate: "Dec 12, 2025",
        price: "$89.00",
        ticketNo: "TK-44123",
        status: "Completed",
        operator: "Eurostar"
    },
    {
        id: "h2",
        year: "2025",
        from: "Paris",
        to: "London",
        route: "Paris → London",
        completedDate: "Nov 05, 2025",
        price: "$110.00",
        ticketNo: "TK-33210",
        status: "Completed",
        operator: "Eurostar"
    },
    {
        id: "h3",
        year: "2024",
        from: "Madrid",
        to: "Barcelona",
        route: "Madrid → Barcelona",
        completedDate: "Oct 20, 2024",
        price: "$45.00",
        ticketNo: "TK-22109",
        status: "Completed",
        operator: "Renfe"
    },
    {
        id: "h4",
        year: "2024",
        from: "Berlin",
        to: "Prague",
        route: "Berlin → Prague",
        completedDate: "Aug 15, 2024",
        price: "$35.00",
        ticketNo: "TK-11098",
        status: "Completed",
        operator: "Deutsche Bahn"
    }
];

/**
 * Get all journey history for the current user
 * Supports searching by query param ?q=
 */
const getHistory = async (req, res) => {
    try {
        let filteredHistory = [...journeyHistory];
        const { q, year } = req.query;

        if (q) {
            const search = q.toLowerCase();
            filteredHistory = filteredHistory.filter(h =>
                h.route.toLowerCase().includes(search) ||
                h.from.toLowerCase().includes(search) ||
                h.to.toLowerCase().includes(search) ||
                h.ticketNo.toLowerCase().includes(search)
            );
        }

        if (year) {
            filteredHistory = filteredHistory.filter(h => h.year === year);
        }

        res.status(200).json({
            success: true,
            count: filteredHistory.length,
            data: filteredHistory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch history",
            error: error.message
        });
    }
};

/**
 * Get details for a specific history item
 */
const getHistoryById = async (req, res) => {
    try {
        const item = journeyHistory.find(h => h.id === req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "History item not found"
            });
        }

        res.status(200).json({
            success: true,
            data: item
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

module.exports = {
    getHistory,
    getHistoryById
};
