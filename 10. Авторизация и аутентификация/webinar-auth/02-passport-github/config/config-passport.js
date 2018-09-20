const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const config = require('./config');
const mongoose = require('mongoose');
require('../models/user');
const User = mongoose.model('login');

passport.serializeUser(function (user, done) {
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    done(null, id);
  } else {
    User
      .findById(id, function (err, user) {
        done(err, user);
      });
  }
});

// локальная стратегия

passport.use('loginUsers', new LocalStrategy((username, password, done) => {
  console.log(username);
  User
    .findOne({login: username})
    .then(user => {
      console.log(user);
      if (user.validPassword(password)) {
        console.log(user);
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch(err => {
      console.log(err);
      done(err);
    });
}));

passport.use(new GithubStrategy({
  clientID: config.github.clientID,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackURL
}, function (accessToken, refreshToken, profile, done) {
  console.log('profile: ' + JSON.stringify(profile));
  return done(null, profile);
}));
