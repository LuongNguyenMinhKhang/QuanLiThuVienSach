const path = require('path');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars'); // Import the engine function from express-handlebars
const app = express();
const port = 3000;
const route = require('./routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use morgan for logging HTTP requests
app.use(morgan('combined'));
app.use(session({
    secret: 'your-secret-key', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set true if HTTPS is enabled
}));

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});
  
// Configure the Handlebars engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resource/views'));
route(app);

// Start the server and listen on port 3000
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
