const express = require('express');
const router = express.Router();

const ContactController = require('../controller/ContactController');

// Define the contact route
router.get('/', ContactController.contact);

module.exports = router;
