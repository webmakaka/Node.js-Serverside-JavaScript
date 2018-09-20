const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const loginToken = mongoose.model('loginToken');
const asyncMiddleware = require('../middleware/asyncmiddleware');
const setCookie = require('../lib/setcookie');

const isValidCookie = (cookieSeries, userSeries) => {
  return cookieSeries === userSeries ? true : false;
};

const isValidToken = (cookieToken, userToken) => {
  return cookieToken === userToken ? true : false;
};

const registerUser = async (req, res, login) => {
  let token = uuidv4();
  await loginToken.update({ login }, { $set: { token } });
  let loginUser = await loginToken.findOne({ login });
  setCookie(res, loginUser);
  let user = await User.findOne({ login });
  return new Promise((resolve, reject) => {
    req.logIn(user, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

router.get('/', asyncMiddleware(async (req, res, next) => {
  if (!!req.cookies.logintoken) {
    let objTokens = JSON.parse(req.cookies.logintoken);
    let login = objTokens.login;
    let user = await loginToken.findOne({ login });

    if (!!user && isValidCookie(objTokens.series, user.series)) {
      if (isValidToken(objTokens.token, user.token)) {
        await registerUser(req, res, login);
      } else {
        req.flash(
          'message',
          'Внимание!  Похоже вы утратили контроль над своим аккаунтом. Смените срочно пароль!'
        );
        res.clearCookie('logintoken');
        await loginToken.remove({ login });
      }
    }
  }
  next();
}));

module.exports = router;