const express = require('express');
const router = express.Router();

// controller
const userController = require('../controllers/userController');

// middleware
const userMiddleware = require('../middlewares/user.middleware');

// User
router
    .route('/')
    .get(userController.getAll)
    .post(userMiddleware.createOne, userController.createOne)

router
    .route('/:id')
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;