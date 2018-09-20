const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bCrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const User = mongoose.model('user');

passport.serializeUser(function(user, done) {
  console.log('serializeUser: ', user);
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('deserializeUser: ', id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// локальная стратегия
passport.use(
  'loginUsers',
  new LocalStrategy(
    {
      passReqToCallback: true
    },
    (req, username, password, done) => {
      User.findOne({ login: username })
        .then(user => {
          if (!user) {
            return done(
              null,
              false,
              req.flash('message', 'Пользователь не найден')
            );
          }
          if (!isValidPassword(user, password)) {
            return done(null, false, req.flash('message', 'Не верный пароль'));
          }
          return done(null, user);
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

const isValidPassword = function(user, password) {
  return bCrypt.compareSync(password, user.password);
};