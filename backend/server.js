import express from 'express';
import cors from 'cors';
import { db } from './database/db.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
    res.send('Railway Ticket Backend is running!');
});

// Example API: Get all trains
app.get('/api/trains', async (req, res) => {
    try {
        const trainsSnapshot = await db.collection('trains').get();
        const trains = trainsSnapshot.docs.map(doc => doc.data());
        res.json(trains);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
