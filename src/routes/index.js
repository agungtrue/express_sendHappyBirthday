const express = require('express');
const app = express();
const router = express.Router();
// const validateJWT = require('../middleware/validateJwt');
const httpStatus = require('http-status');

// mounting all routes
// const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const emailLogRoutes = require('./emailLogRoutes');

router.get('/', (req, res) => {
    return res.status(200).json({ status: 'OK', message: 'welcome to API server'})
});

// users
router.use('/v1/api/users', userRoutes);
router.use('/v1/api/email-log', emailLogRoutes);

// any request handler
app.all('*', (req, res, next) => {
    return res.status(404).json({ status: httpStatus.NOT_FOUND, message: 'cannot find any resources' });
})

module.exports = router;