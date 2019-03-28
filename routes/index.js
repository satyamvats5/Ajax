const express = require('express');

const router = express.Router();

const AuthController = require('../controller/authController');

router.post('/auth/login', AuthController.login);

router.post('/auth/signup', AuthController.signup);

module.exports = router;