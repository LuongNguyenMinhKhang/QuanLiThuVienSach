const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController.js');
router.get('/user', UserController.LoadContent);
router.get('/', UserController.LoadContent);

module.exports = router;