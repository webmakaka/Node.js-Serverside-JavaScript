const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  secret: 'loftschool',
  key: 'key',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.all('/', function (req, res, next) {
  console.log(req.session.id);
  req.session.views = req.session.views === void 0
    ? 0
    : req.session.views;
  req.session.views++;
  next();
})

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port ' + server.address().port);
});