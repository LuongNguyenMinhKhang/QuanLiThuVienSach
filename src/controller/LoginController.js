const User = require('../models/usermodel.js');

class LoginController {
    Login(req, res, next) {
        if(req.session.loggedin && req.session.isAdmin) {
            res.redirect('/'); //Duy đức tự sửa nha
            return;
        }
        if(req.session.loggedin && !req.session.isAdmin) {
            res.redirect('/user');
            return;
        }
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
                req.session.loggedin = true;
                req.session.username = username;
                console.log(results[0].userRole);
                if(results[0].userRole == 1) {
                    req.session.isAdmin = true;
                }
                else {
                    req.session.isAdmin = false;
                }
                res.redirect('/home');
            } else {
                res.redirect('/login');
            }
        });
    }

    Logout(req, res, next) {
        req.session.loggedin = false;
        res.redirect('/home');
    }
}

module.exports = new LoginController();
