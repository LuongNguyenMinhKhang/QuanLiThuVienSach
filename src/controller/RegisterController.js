const User = require('../models/usermodel.js');

class RegisterController {
    Register(req, res, next) {
        res.render('register');
    }
}

const siteKey = '6LeI1wMrAAAAANclLs0c9QC7jETXHZYrPZtu6-CO';
const secretKey = '6LeI1wMrAAAAAGKSyASw5yrkdgNC5dMOEx2qEzEl';

module.exports = new RegisterController();