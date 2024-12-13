var express = require('express');
var router = express.Router();
var Member = require('../models/member');
var passport = require("passport");

// GET / prevent showing error from Vercel
router.get('/', async (req, res) => {
  return res.status(200).json({ message: "success" });
})

// POST /register
router.post('/register', async (req, res) => {
  try {
    

    // Register the user using the `register` method which handles both user creation and password hashing
    Member.register(new Member({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
    }), req.body.password, (err, member) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      // Send a success response if registration was successful
      res.status(201).json({ message: 'User registered successfully!' });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// POST /log in
router.post("/login", (req, res, next) => {
  console.log('Attempting to authenticate:', req.body);
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).json({ success: false, message: "An error occurred." });
    }
    if (!user) {
      // Login failed
      console.log('Authentication failed:', info.message || "Invalid credentials");
      return res.status(401).json({ success: false, message: info.message || "Invalid credentials" });
    }
    // Login succeeded
    console.log('User authenticated:', user);
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "An error occurred during login." });
      }
      return res.status(200).json({ 
        success: true,
        message: "Login successful!",
        user: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      });
    });
  })(req, res, next);
});

// POST /log out
router.post('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
        return res.status(500).json({ success: false, message: 'Logout failed' });
    }
    res.status(200).json({ success: true, message: 'Logged out successfully' });
  });
});


module.exports = router;
