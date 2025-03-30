const express = require('express');
const router = express.Router();

const UserController = require('../controller/UserController.js');
router.get('/user', UserController.UserInformation);
router.get('/', UserController.UserInformation);

module.exports = router;