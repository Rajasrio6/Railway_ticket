const getRelativeTime = (hoursOffset, minutesOffset = 0) => {
    const now = new Date();
    const future = new Date(now.getTime() + (hoursOffset * 60 + minutesOffset) * 60000);
    return future.getHours().toString().padStart(2, '0') + ":" + future.getMinutes().toString().padStart(2, '0');
};

const getArrivalTime = (departureTime, durationStr) => {
    const [h, m] = departureTime.split(':').map(Number);
    const durationMatch = durationStr.match(/(\d+)h\s*(\d*)m?/);
    const durH = parseInt(durationMatch[1]) || 0;
    const durM = parseInt(durationMatch[2]) || 0;

    let totalM = m + durM;
    let extraH = Math.floor(totalM / 60);
    totalM %= 60;
    let totalH = (h + durH + extraH) % 24;

    return totalH.toString().padStart(2, '0') + ":" + totalM.toString().padStart(2, '0');
};

export const getTrains = () => {
    const trainsData = [
        {
            id: 1,
            operator: "Eurostar",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eurostar_logo.svg/1200px-Eurostar_logo.svg.png",
            duration: "8h 10m",
            departureOffset: 30, // 30 mins from now
            origin: "Berlin Hbf",
            destination: "London St Pancras",
            price: 350,
            seatsLeft: 23,
            facilities: ["Socket", "Wifi", "TV"],
            recommended: false,
            trainImage: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            operator: "DB Navigator",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Deutsche_Bahn_Logo.svg/1200px-Deutsche_Bahn_Logo.svg.png",
            duration: "6h 45m",
            departureOffset: 120, // 2h from now
            origin: "Berlin Hbf",
            destination: "London St Pancras",
            price: 280,
            seatsLeft: 12,
            facilities: ["Wifi", "Meal"],
            recommended: true,
            trainImage: "https://images.unsplash.com/photo-1541427468627-a89a96e5ca1d?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            operator: "Eurostar Premium",
            logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Eurostar_logo.svg/1200px-Eurostar_logo.svg.png",
            duration: "7h 30m",
            departureOffset: 240, // 4h from now
            origin: "Berlin Hbf",
            destination: "London St Pancras",
            price: 420,
            seatsLeft: 5,
            facilities: ["Full Meal", "Extra Legroom", "Wifi"],
            recommended: true,
            trainImage: "https://images.unsplash.com/photo-1474487024251-2485641ca6c9?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return trainsData.map(t => {
        const departureTime = getRelativeTime(0, t.departureOffset);
        const arrivalTime = getArrivalTime(departureTime, t.duration);
        return {
            ...t,
            departureTime,
            arrivalTime
        };
    });
};

export const trains = getTrains(); // Keep static export for simpler migration if needed, but controller will use getTrains

export const users = [
    {
        id: 1,
        email: 'demo@easyticket.com',
        name: 'Demo User',
        password: 'password123'
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