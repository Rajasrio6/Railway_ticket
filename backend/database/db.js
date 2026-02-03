const mongoose = require('mongoose');

/**
 * Database Connection Setup
 * Using MongoDB as the primary database
 */
const connectDB = async () => {
    try {
        // Replace the URI with your MongoDB connection string
        // Standard local MongoDB: 'mongodb://localhost:27017/railway_ticket'
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/railway_ticket', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;