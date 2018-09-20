const express = require('express');
const app = module.exports = express();
const HttpError = require('../../error');

app.use('/v1.0', require('./v1.0'));
app.get('/', (req, res) => {
  throw new HttpError('api ok, please choose version /v1.0', 400);
});
