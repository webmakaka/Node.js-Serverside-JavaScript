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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our hurra api is running on port ${ PORT } !!!`);
});

module.exports = app;
