const express = require('express');
const router = express.Router();

const LoginController = require('../controller/LoginController');
router.post('/', LoginController.CheckLogin);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;

>>>>>>> 40bcc426c69195d0e67bbdb63def64dc681468ae
