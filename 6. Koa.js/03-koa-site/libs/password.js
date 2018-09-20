const crypto = require('crypto');
const db = require('../models/db');

module.exports.setPassword = function (password) {
  salt = crypto
    .randomBytes(16)
    .toString('hex');
  hash = crypto
    .pbkdf2Sync(password, salt, 1000, 512, 'sha512')
    .toString('hex');
  return {salt, hash}
};

module.exports.validPassword = function (password) {
  const user = db
    .get('user')
    .value()
  const hash = crypto
    .pbkdf2Sync(password, user.salt, 1000, 512, 'sha512')
    .toString('hex');
  return user.hash === hash;
};