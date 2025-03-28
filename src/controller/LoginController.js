<<<<<<< HEAD
class LoginController {
    Login(req, res, next) {
=======
const User = require('../models/usermodel.js');

class LoginController {
    Login(req, res, next) {
        //if(sessionStorage.getItem)
>>>>>>> 40bcc426c69195d0e67bbdb63def64dc681468ae
        res.render('login');
    }
    CheckLogin(req, res, next) {
        let username = req.body.email;
        let password = req.body.password;
<<<<<<< HEAD
        res.send('Email: ' + username + ' Password: ' + password);
=======
        console.log('login data: ', username, password);
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
>>>>>>> 40bcc426c69195d0e67bbdb63def64dc681468ae
    }
}

module.exports = new LoginController();
