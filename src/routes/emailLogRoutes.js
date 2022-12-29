const express = require('express');
const router = express.Router();

// controller
const emailLogController = require('../controllers/emailLogController');

// Email Log
router
    .route('/')
    .get(emailLogController.getAll)
    
router
    .route('/failed-to-send')
    .get(emailLogController.getFailedSendEmail)



module.exports = router;