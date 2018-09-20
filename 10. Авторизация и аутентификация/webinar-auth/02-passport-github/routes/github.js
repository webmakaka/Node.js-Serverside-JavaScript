const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/github', passport.authenticate('github'), function (req, res) {});
router.get('/github/callback', passport.authenticate('github', {failureRedirect: '/'}), function (req, res) {
  res.redirect('/private');
});

module.exports = router;