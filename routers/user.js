const express = require('express');
const router = express.Router();

const userController = require('../controllers/user_controller');

// for USER
    // router.post('/create', userController.register_user);
    // router.post('/sign-in', userController.sign_in_user);

// for ADMIN
router.post('/create', userController.signup);
router.post('/log-in', userController.login);

module.exports=router;