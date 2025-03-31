const express = require('express');
const router = express.Router();

const RegisterController = require('../controller/UserController');
router.post('/RegisterPost', RegisterController.RegisterPost);
router.get('/', RegisterController.Register);

module.exports = router;
