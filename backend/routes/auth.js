var express = require('express');
var router = express.Router();
var passport = require('passport');

// everything here starts with /auth
router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  function (req, res, next) {
    res.locals.registeredMsg = '';
    next();
  },
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function (req, res) {
    // Successful authentication, redirect home.
    return res.redirect('/home');
  }
);

module.exports = router;
