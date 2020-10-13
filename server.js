// -------------------------- REQUIREMENTS
// Core Modules
// 3rd Party Modules
// Custom Modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const methodOverride = require('method-override');
const app = express();
// DOTENV
require('dotenv').config();
const PORT = process.env.PORT || 4000;

// SET VIEW ENGINE
app.set('view engine', 'ejs');

// Controllers
const ctrl = require('./controllers');

// -------------------------- MIDDLEWARE
// Server Static Assets (JS, CSS, Images)
app.use(express.static(`${__dirname}/public`));

// Body Parser - puts request data on req.body
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Logging middleware passing our own configuration
app.use(morgan(':method :url'));
// Method Override
app.use(methodOverride('_method'));

// -------------------------- ROUTES

// Home Route
app.get('/', (req, res) => {
  res.render('index');
});

// Authors Routes
app.use('/authors', ctrl.authors);
app.use('/articles', ctrl.articles);

// 404 Route
app.use('*', (req, res) => {
  res.render('404');
});


// -------------------------- LISTENER
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
