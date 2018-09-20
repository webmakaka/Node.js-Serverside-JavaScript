const express = require('express');
const app = module.exports = express();
const HttpError = require('../../../error');

app.use('/users', require('./users'));
app.get('/', (req, res) => {
  throw new HttpError('wrong query, choose v1.0/users', 400);
});
