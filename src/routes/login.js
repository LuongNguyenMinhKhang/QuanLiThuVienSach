const express = require('express');
const router = express.Router();

const LoginController = require('../controller/LoginController');
router.get('/logout', LoginController.Logout);
router.get('/login', LoginController.Login);
router.post('/checklogin', LoginController.CheckLogin);
router.get('/', LoginController.Login);

module.exports = router;
