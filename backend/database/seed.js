import { db } from './db.js';

async function seed() {
    console.log('Seeding database...');

    try {
        // 1. Users
        const userRef = db.collection('users').doc('sample_user_1');
        await userRef.set({
            uid: 'sample_user_1',
            email: 'test@example.com',
            displayName: 'Test User',
            role: 'user',
            createdAt: new Date()
        });
        console.log('Created sample user');

        // 2. Trains
        const trainRef = db.collection('trains').doc('train_101');
        await trainRef.set({
            trainId: 'train_101',
            name: 'Express 101',
            source: 'NYC',
            destination: 'WAS',
            departureTime: new Date(Date.now() + 86400000).toISOString(),
            arrivalTime: new Date(Date.now() + 90000000).toISOString(),
            seatsAvailable: 50,
            price: 100
        });
        console.log('Created sample train');

        // 3. Bookings
        const bookingRef = db.collection('bookings').doc('booking_abc');
        await bookingRef.set({
            bookingId: 'booking_abc',
            userId: 'sample_user_1',
            trainId: 'train_101',
            passengerName: 'John Doe',
            seatNumber: 'A1',
            status: 'confirmed',
            bookingDate: new Date()
        });
        console.log('Created sample booking');

        // 4. Payments
        const paymentRef = db.collection('payments').doc('pay_xyz');
        await paymentRef.set({
            paymentId: 'pay_xyz',
            bookingId: 'booking_abc',
            amount: 100,
            status: 'success',
            method: 'card',
            timestamp: new Date()
        });
        console.log('Created sample payment');

        console.log('Seeding complete.');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
}

seed();
