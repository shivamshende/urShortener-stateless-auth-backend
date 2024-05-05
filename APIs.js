require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dataOperations = require('./dbmodel');

const router = express.Router();
const secret = process.env.JWT_SECRET;

router.post('/api/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await dataOperations.User.create({ username, password: hashedPassword, role });
        const token = jwt.sign({ userId: user._id, username, role }, secret, { expiresIn: '2d' });
        res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
        res.json({ message: 'registered!' });
        console.log(token)
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await dataOperations.User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

        const token = jwt.sign({ userId: user._id, username, role: user.role }, secret, { expiresIn: '2d' });
        res.cookie('token', token, { maxAge: 3600000, httpOnly: true });
        res.json({ message: 'logged in!' });
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/api/isAuthenticated', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.json({ isAuthenticated: false });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const { userId, username, role } = decoded;

        const user = await dataOperations.User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({ isAuthenticated: true, userId, name: username, role });
    } catch (err) {
        return res.json({ isAuthenticated: false });
    }
});

router.get('/api/usersData', async (req, res) => {
    try {
        const users = await dataOperations.User.find({});
        res.json(users);
    } catch (err) {
        console.error('Error getting users:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/logout', (req, res) => {
    res.clearCookie('token').json({ message: 'Logged out successfully' });
});

router.post('/api/shortenUrl', async (req, res) => {
    const { originalUrl, userId } = req.body;

    const shortenedUrl = generateShortUrl(originalUrl);

    try {
        await dataOperations.Url.create({ originalUrl, shortenedUrl, userId });
        res.json({ shortUrl: `http://localhost:4000/api/${shortenedUrl}` });
    } catch (err) {
        console.error('Error shortening URL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/api/:shortenedUrl', async (req, res) => {
    const { shortenedUrl } = req.params;

    try {
        const currentDate = new Date();

        const url = await dataOperations.Url.findOneAndUpdate(
            { shortenedUrl },
            { $inc: { visits: 1 }, lastVisit: currentDate },
            { new: true } // Return the updated document
        );
        if (!url) return res.status(404).json({ error: 'URL not found' });

        console.log('Updated URL:', url);

        res.redirect(url.originalUrl);
    } catch (err) {
        console.error('Error updating URL visits or fetching original URL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/api/userUrlsData', async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, secret);
        const userId = decoded.userId;

        const urls = await dataOperations.Url.find({ userId });
        res.json(urls);
    } catch (err) {
        console.error('Error fetching user URLs:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/api/demoShortenUrl', async (req, res) => {
    const { demo_originalUrl } = req.body;

    const demo_shortUrl = generateShortUrl(demo_originalUrl);

    try {
        await dataOperations.DemoUrl.create({ demo_originalUrl, demo_shortUrl });
        res.json({ shortUrl: `http://localhost:4000/api/short/${demo_shortUrl}` });
    } catch (err) {
        console.error('Error inserting demo URL:', err);
        res.status(500).json({ error: 'Failed to insert URL into database' });
    }
});

router.get('/api/short/:demoShortenedUrl', async (req, res) => {
    const { demoShortenedUrl } = req.params;

    try {
        const demoUrl = await dataOperations.DemoUrl.findOne({ demo_shortUrl: demoShortenedUrl });
        if (!demoUrl) return res.status(404).json({ error: 'URL not found' });

        res.redirect(demoUrl.demo_originalUrl);
    } catch (err) {
        console.error('Error fetching original URL:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

function generateShortUrl(originalUrl) {
    return Math.random().toString(36).substring(2, 7);
}

module.exports = router;