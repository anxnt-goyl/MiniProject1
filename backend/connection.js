const mongoose = require('mongoose');

// Connect to MongoDB
async function connectToDatabase(url){
    return await mongoose.connect(url);
}

// Export the connection function
module.exports = connectToDatabase;