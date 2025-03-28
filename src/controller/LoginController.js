class LoginController {
    Login(req, res, next) {
        res.render('login');
    }
    CheckLogin(req, res, next) {
        let username = req.body.email;
        let password = req.body.password;
        res.send('Email: ' + username + ' Password: ' + password);
    }
}

module.exports = new LoginController();
