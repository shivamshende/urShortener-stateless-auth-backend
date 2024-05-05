require('dotenv').config();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, { dbName: 'url_shortener' });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    // process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
