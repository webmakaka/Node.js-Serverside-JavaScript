const express = require('express');
const router = express.Router();

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res
    .status(401)
    .render('denied', {});
}

router.get('/', isLoggedIn, (req, res) => {
  res.render('admin', {});
});

module.exports = router;