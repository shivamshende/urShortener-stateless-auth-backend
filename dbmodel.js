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