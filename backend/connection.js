const mongoose = require('mongoose');

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Atlas connected successfully');
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        process.exit(1);
    }
}

module.exports = connectToDatabase;