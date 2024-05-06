require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiRoutes = require('./APIs');
const cors = require('cors');
const connectDB = require('./dbConnection')

connectDB()

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(apiRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

module.exports = app;