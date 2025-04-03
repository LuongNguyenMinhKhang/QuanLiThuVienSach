const User = require('../models/usermodel.js');

class UserController {
    //Load page content
    UserInformation(req, res) {
        res.render('user');
    }

    Register(req, res, next) {
        res.render('register');
    }

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

    //Logic 
    
    RegisterPost(req, res, next) {
        const { email, password } = req.body;
        if(User.checkUserName(email, (err, results) => {
            if (err) {
                console.error('Error checking username:', err);
                return res.status(500).json({ error: 'Failed to check username' });
            }
            if (results.length > 0) {
                return res.status(400).json({ error: 'Username already exists' });
            } else {
                const userRole = 0; // Assuming 0 is for regular users
                User.createUser(email, password, userRole, (err, results) => {
                    if (err) {
                        console.error('Error creating user:', err);
                        return res.status(500).json({ error: 'Failed to create user' });
                    }
                    res.redirect('/login');
                });
            }
        }));
    }

    CheckLogin(req, res, next) {
        const { email, password } = req.body;
        User.checkLogin(email, password, (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to load login', results });
            }
            if (results.length > 0) {
                req.session.userID = results[0].userID;
                req.session.loggedin = true;
                req.session.email = email;
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

    //Logout
    Logout(req, res, next) {
        req.session.loggedin = false;
        req.session.userID = null;
        res.redirect('/home');
    }
}
module.exports = new UserController();