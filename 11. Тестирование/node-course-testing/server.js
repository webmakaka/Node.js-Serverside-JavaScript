// express
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// add routes
require('./routes')(app);

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({status: err.status, message: err.message});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

module.exports = app;
