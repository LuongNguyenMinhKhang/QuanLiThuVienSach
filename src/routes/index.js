const contactRouter = require('./contact.js');
const shopingRouter = require('./shopingcart.js');
const loginRouter = require('./login.js');
const homeRouter = require('./home.js');
const userRouter = require('./user.js');
const registerRouter = require('./register.js');
const shopingcartRoutes = require('./shopingcart');

function route(app) {
    app.use('/shopingcart', shopingcartRoutes);
    app.use('/login', loginRouter);
    app.use('/user', userRouter);
    app.use('/register', registerRouter);
    app.use('/contact', contactRouter);
    app.use('/home', homeRouter);
    app.use('/', homeRouter);
}

module.exports = route;
