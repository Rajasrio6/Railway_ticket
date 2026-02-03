const trainsData = [
    // Basic fallback data for major routes
    {
        id: "ir-12622",
        trainNumber: "12622",
        trainName: "Tamil Nadu Express",
        operator: "Indian Railways",
        operatorLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/IR_Logo.svg/1200px-IR_Logo.svg.png",
        from: "Chennai Central",
        to: "New Delhi",
        departureTime: "22:00",
        arrivalTime: "06:40",
        duration: "32h 40m",
        price: 45,
        seatsLeft: 112,
        facilities: ["Meal", "Wifi", "Socket"],
        class: "Economy",
        type: "Recommended",
        rating: 4.5
    },
    {
        id: "ir-12434",
        trainNumber: "12434",
        trainName: "Chennai Rajdhani Express",
        operator: "Indian Railways",
        operatorLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/4/45/IR_Logo.svg/1200px-IR_Logo.svg.png",
        from: "Chennai Central",
        to: "New Delhi",
        departureTime: "06:10",
        arrivalTime: "10:30",
        duration: "28h 20m",
        price: 85,
        seatsLeft: 45,
        facilities: ["Meal", "Wifi", "Socket", "TV"],
        class: "Business",
        type: "Recommended",
        rating: 4.8
    }
];

// Mapping for major station names to codes for better matching
const stationCodes = {
    "chennai central": "MAS",
    "chennai": "MAS",
    "new delhi": "NDLS",
    "delhi": "NDLS",
    "mumbai central": "MMCT",
    "mumbai": "BCT",
    "bangalore cty": "SBC",
    "bangalore": "SBC",
    "hyderabad": "HYB",
    "kolkata": "HWH",
    "howrah": "HWH",
    "pune": "PUNE",
    "ahmedabad": "ADI",
    "jaipur": "JP",
    "lucknow": "LKO"
};

module.exports = { trainsData, stationCodes };
