// -------------------------- REQUIREMENTS
// Core Modules
// 3rd Party Modules
// Custom Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
// DOTENV
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 4000;

// SET VIEW ENGINE
app.set('view engine', 'ejs');

// Controllers
const ctrl = require('./controllers');

// -------------------------- MIDDLEWARE
// Server Static Assets (JS, CSS, Images)
app.use(express.static(`${__dirname}/public`));

// Express Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, // Only save the session if a property changes
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2 // expires in 2 weeks
  }
}));

// Body Parser - puts request data on req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));
// Logging middleware passing our own configuration
app.use(morgan(':method :url'));

// -------------------------- ROUTES

// Home Route
app.get('/', (req, res) => {
  res.render('index');
});

// Authors Routes
app.use('/authors', ctrl.authors);
app.use('/articles', ctrl.articles);
app.use('/auth', ctrl.auth);

// 404 Route
app.use('*', (req, res) => {
  res.render('404');
});


// -------------------------- LISTENER
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
