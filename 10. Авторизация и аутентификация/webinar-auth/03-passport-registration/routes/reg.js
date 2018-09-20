var express = require('express');
var router = express.Router();
const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const bCrypt = require('bcrypt-nodejs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('reg', { message: req.flash('message') });
});

router.post('/', function(req, res, next) {
  User.findOne({ login: req.body.username })
    .then(user => {
      if (user) {
        req.flash('message', 'Пользователь с таким логином уже существует');
        res.redirect('/registration');
      } else {
        const newUser = new User();
        newUser.login = req.body.username;
        newUser.password = createHash(req.body.password);
        newUser.email = req.body.email;
        newUser.name = req.body.name;
        newUser
          .save()
          .then(user => {
            req.logIn(user, function(err) {
              if (err) {
                return next(err);
              }
              req.flash('message', 'User create');
              return res.redirect('/profile');
            });
          })
          .catch(next);
      }
    })
    .catch(next);
});

var createHash = function(password) {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
};

module.exports = router;
