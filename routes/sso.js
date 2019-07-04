const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/sso', passport.authenticate('openidconnect'));
router.get('/sso/callback', passport.authenticate('openidconnect', {
  successRedirect: '/auth/profile',
  failureRedirect: '/auth/login',
}));
router.get('/profile',
  (req, res) => res.render('profile', { user: req.user }));

module.exports = router;
