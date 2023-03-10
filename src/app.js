const express = require('express');
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const { join } = require('path');

const { getBirthdayUsers, getFailedSendBirthdayUsers } = require('./services')

// express init
const app = express();
app.use(express.json());

// .env init
const dotenv = require('dotenv');
dotenv.config();

// cors init
app.use(cors());
app.options('*', cors());

// bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

// noSql injection
app.use(mongoSanitize());

// routers
const routers = require('./routes');

// router init
app.use(routers);

// start get birthday users
getBirthdayUsers({messageEvent: 'it’s your birthday.'});

// getFailedSendBirthdayUsers init
getFailedSendBirthdayUsers({messageEvent: 'it’s your birthday.'}); // resend

module.exports = app;