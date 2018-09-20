const express = require('express');
const bodyParser = require('body-parser');
const jwt = require("jwt-simple");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const config = require('./config/config');
const routerCats = require('./routes/cats');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:567234@ds121965.mlab.com:21965/it651', {useMongoClient: true});

require('./models/user');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))
// parse application/json
app.use(bodyParser.json())
app.use(session({
  secret: 'secret',
  key: 'keys',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: null
  },
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

require('./config/passport-config');
app.use(passport.initialize({userProperty: 'payload'}));
app.use(passport.session());

app.post('/token', function (req, res, next) {
  passport.authenticate('loginUsers', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({status: 'Укажите правильный логин и пароль!'});
    }
    req
      .logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        var payload = {
          id: user.id
        };
        var token = jwt.encode(payload, config.secret); // line 10 passport-config
        res.json({token: token});
      });
  })(req, res, next);
});

app.use('/api/cats', routerCats);

app.use((req, res, next) => {
  res
    .status(404)
    .json({err: '404'});
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res
    .status(500)
    .json({err: '500'});
})

app.listen(3000, function () {
  console.log('Server running. Use our API');
})