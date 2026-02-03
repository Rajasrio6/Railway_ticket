export const trains = [
    {
        id: 1,
        operator: "Eurostar",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eurostar_logo.svg/1200px-Eurostar_logo.svg.png",
        duration: "8h 10m",
        departureTime: "14:30",
        arrivalTime: "22:40",
        origin: "Berlin Hbf",
        destination: "London St Pancras",
        price: 350,
        seatsLeft: 23,
        facilities: ["Socket", "Wifi", "TV"],
        recommended: false,
        trainImage: "/images/train1.png"
    },
    {
        id: 2,
        operator: "DB Navigator",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Deutsche_Bahn_Logo.svg/1200px-Deutsche_Bahn_Logo.svg.png",
        duration: "6h 45m",
        departureTime: "09:15",
        arrivalTime: "16:00",
        origin: "Berlin Hbf",
        destination: "London St Pancras",
        price: 280,
        seatsLeft: 12,
        facilities: ["Wifi", "Meal"],
        recommended: true,
        trainImage: "/images/train2.png"
    },
    {
        id: 3,
        operator: "Eurostar Premium",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eurostar_logo.svg/1200px-Eurostar_logo.svg.png",
        duration: "7h 30m",
        departureTime: "10:00",
        arrivalTime: "17:30",
        origin: "Berlin Hbf",
        destination: "London St Pancras",
        price: 420,
        seatsLeft: 5,
        facilities: ["Full Meal", "Extra Legroom", "Wifi"],
        recommended: true,
        trainImage: "/images/train3.png"
    }
];

export const bookings = [
    {
        id: "BK-101",
        userId: 1,
        trainId: 1,
        status: "Upcoming",
        bookingDate: new Date().toISOString()
    }
];