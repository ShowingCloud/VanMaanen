const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/sso', passport.authenticate('openidconnect'));
router.get('/sso/callback', passport.authenticate('openidconnect', {
  successRedirect: '/',
  failureRedirect: '/login',
}));

module.exports = router;
