const User = require('../models/usermodel.js');

class LoginController {
    Login(req, res, next) {
        //if(sessionStorage.getItem)
        res.render('login');
    }
    CheckLogin(req, res, next) {
        let username = req.body.email;
        let password = req.body.password;
        User.checkLogin(username, password, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to load login', results });
            }
            if (results.length > 0) {
                //sessionStorage.setItem('user', username);
                res.redirect('/home');
            } else {
                res.redirect('/login');
            }
        });
    }
}

module.exports = new LoginController();
