// const db = require('./dbConnection');

// const registerUsers = (username, password, role, callback) => {
//   db.query('INSERT INTO urlShortenerUsers (username, password, role) VALUES (?, ?, ?)', [username, password, role], callback);
// }

// const getUserByUsername = (username, callback) => {
//   db.query('SELECT * FROM urlShortenerUsers WHERE username = ?', [username], callback)
// }

// //get user by id
// const getUserById = (id, callback) => {
//   db.query('SELECT * FROM urlShortenerUsers WHERE id = ?', [id], callback);
// };


// const getAllUsers = (callback) => {
//   db.query('SELECT * FROM urlShortenerUsers', callback);
// };

// const insertUrlData = (originalUrl, shortenedUrl, userId, callback) => {
//   db.query('INSERT INTO urlHistory (userId, originalUrl, shortenedUrl) VALUES (?, ?, ?)', [userId, originalUrl, shortenedUrl], callback);
// };

// const getOriginalUrl = (shortenedUrl, callback) => {
//   db.query('SELECT originalUrl FROM urlHistory WHERE shortenedUrl = ?', [shortenedUrl], callback);
// };

// const updateUrlVisits = (shortenedUrl, callback) => {
//   db.query('UPDATE urlHistory SET totalVisits = totalVisits + 1, lastVisit = CURRENT_TIMESTAMP WHERE shortenedUrl = ?', [shortenedUrl], callback);
// };

// const getUserUrls = (userId, callback) => {
//   db.query('SELECT * FROM urlHistory WHERE userId = ?', [userId], callback);
// };


// //demo url Shortener database
// function inserDemoUrls(originalUrl, shortUrl, callback) {
//   db.query('INSERT INTO demoUsersUrl (demo_originalUrl, demo_shortUrl) VALUES (?, ?)', [originalUrl, shortUrl], callback);
// }

// function getDemoOriginalByShort(shortUrl, callback) {
//   db.query('SELECT demo_originalUrl FROM demoUsersUrl WHERE demo_shortUrl = ?', [shortUrl], callback);
// }

// const dataOperations = {registerUsers, getUserByUsername, getUserById, getAllUsers, insertUrlData, getOriginalUrl, updateUrlVisits, getUserUrls, inserDemoUrls, getDemoOriginalByShort}

// module.exports = dataOperations;


//mongodb model
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
}, {collection: 'Users'});

const User = mongoose.model('User', userSchema);

const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortenedUrl: String,
    userId: mongoose.Types.ObjectId,
    visits: { type: Number, default: 0 },
    lastVisit: { type: Date }
}, {collection: 'Url_history'});

const Url = mongoose.model('Url', urlSchema);

const demoUrlSchema = new mongoose.Schema({
    demo_originalUrl: String,
    demo_shortUrl: String
}, {collection: 'DemoUsers'});

const DemoUrl = mongoose.model('DemoUrl', demoUrlSchema);

const dataOperations = { User, Url, DemoUrl };

module.exports = dataOperations;