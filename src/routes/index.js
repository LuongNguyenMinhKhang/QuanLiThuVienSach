const contactRouter = require('./contact.js');
const shopingRouter = require('./shopingcart.js');
const loginRouter = require('./login.js');
const homeRouter = require('./home.js');
const auth = require('./auth.js');

function route(app) {
    app.use('/shopingcart', shopingRouter);
    app.use('/login', loginRouter);
    app.use('/auth', auth);
    app.use('/contact', contactRouter);
    app.use('/home', homeRouter);
    app.use('/', homeRouter);
}

module.exports = route;
