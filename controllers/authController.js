const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

// DB
const db = require('../models');

// Current Path = '/auth'

// ----------------------------------- REGISTER

// GET Register Form
router.get('/register', (req, res) => {
  res.render('auth/register');
});


// POST Auth (Sign Up New User)
router.post('/', (req, res) => {
  // Check for Existing account by email address
  db.User.findOne({email: req.body.email}, (err, user) => {
    if (err) return console.log(err);

    // If User Exists, redirect
    if (user) {
      console.log('User Account Already Exists');
      return res.redirect('/auth/register');
    }


    // HASH THE USER PASSWORD BEFORE CREATING USER!!!!

    // Generate Hash Salt (Adds further complication to password hash)
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log('Error Genating Salt');
      // console.log('Salt = ', salt);

      // Hash plain text password from registration form
      // Hashing is not reversable
      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return console.log('Error hashing password');

        // console.log('Hashed Password = ', hashedPassword);

        // Create the New User
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        }

        // Create the new user with hashed password (NEVER PLAIN TEST PASSWORD!!!!);
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);

          res.redirect('/auth/login');
        });
      });
    });
  });
});



// ----------------------------------- LOGIN

// GET Login Form
router.get('/login', (req, res) => {
  res.render('auth/login');
});


// POST Login Form
router.post('/login', (req, res) => {
  // console.log(req.body);

  // Find user by email address
  db.User.findOne({email: req.body.email}, (err, user) => {
    if (err) return console.log(err);

    // Redirect to Login if no user found
    if (!user) {
      console.log('Login Route: No User Found');
      return res.redirect('/auth/login');
    }

    // Verify user password with login form password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) return console.log('Error comparing passwords');

      if (isMatch) {
        // Create a new session (express-session)
        // Session is created by adding properties to req.session
        // You can add any data type, and as many as you want
        req.session.currentUser = user._id;

        res.redirect('/articles');
      }
    });
  });
});


// Logout User
router.delete('/login', (req, res) => {
  // Check for session before trying to destroying it
  if (req.session.currentUser) {
    req.session.destroy((err) => {
      if (err) return console.log('Error destroying session');

      res.redirect('/auth/login');
    });
  }
});

module.exports = router;
