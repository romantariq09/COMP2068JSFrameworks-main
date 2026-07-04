let express = require('express');
let passport = require('passport');
let User = require('../models/User');

let router = express.Router();

// Show registration page
router.get('/register', (req, res) => {
  res.render('auth/register', {
    title: 'Create Account'
  });
});

// Create a new user account
router.post('/register', async (req, res) => {
  try {
    let { username, email, password } = req.body;

    let newUser = new User({
      username: username,
      email: email
    });

    await User.register(newUser, password);

    req.login(newUser, (error) => {
      if (error) {
        return res.render('auth/register', {
          title: 'Create Account',
          error: error.message
        });
      }

      res.redirect('/tasks');
    });
  } catch (error) {
    res.render('auth/register', {
      title: 'Create Account',
      error: error.message
    });
  }
});

// Show login page
router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Login',
    loginError: req.query.error,
    githubError: req.query.githubError
  });
});

// Log in with local username and password
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/users/login?error=1'
  }),
  (req, res) => {
    res.redirect('/tasks');
  }
);
// Start GitHub login.
router.get(
  '/github',
  passport.authenticate('github', {
    scope: ['user:email']
  })
);

// Handle GitHub callback after authorization.
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/users/login?githubError=1'
  }),
  (req, res) => {
    res.redirect('/tasks/manage');
  }
);

// Log out current user
router.get('/logout', (req, res, next) => {
  req.logout((error) => {
    if (error) {
      return next(error);
    }

    res.redirect('/');
  });
});

module.exports = router;