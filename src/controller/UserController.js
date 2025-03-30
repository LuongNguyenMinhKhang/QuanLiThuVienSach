const User = require('../models/usermodel.js');

class UserController {
    LoadContent(req, res) {
        res.render('user');
    }
}
module.exports = new UserController();