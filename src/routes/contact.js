const express = require('express');
const router = express.Router();

const ContactController = require('../controller/ContactController');

// Define the contact route
router.post('/mailSend', ContactController.PostMail);
router.get('/', ContactController.Contact);

module.exports = router;
