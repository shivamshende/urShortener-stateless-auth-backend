// const mysql = require('mysql');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'shiv',
//     database: 'url_shortener'
// });

// db.connect((err) => {
//     if (err) {
//         console.log('error connecting database', err);
//     }
//     console.log('database connected');
// });

// module.exports = db;



// const mongoose = require('mongoose');

// const mongoURI = 'mongodb+srv://shivamshende200:avys4wI3KTh7sDNK@cluster0.5n5mqgn.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0';

// // Connect to MongoDB Atlas
// mongoose.connect(mongoURI, { dbName: 'url_shortener' })
//   .then(() => {
//     console.log('Connected to MongoDB Atlas');
//   })
//   .catch((err) => {
//     console.error('Error connecting to MongoDB Atlas:', err.message);
//   });


// const mongoURI = 'mongodb+srv://shivamshende200:avys4wI3KTh7sDNK@cluster0.5n5mqgn.mongodb.net/cluster0?retryWrites=true&w=majority&appName=Cluster0';

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
