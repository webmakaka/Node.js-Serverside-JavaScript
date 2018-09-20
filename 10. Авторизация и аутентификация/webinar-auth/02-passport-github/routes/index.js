var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Passport' });
});

router.post('/submit', (req, res, next) => {
  passport.authenticate('loginUsers', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({status: 'Укажите правильный логин и пароль!'})
    }
    req
      .logIn(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.json({status: 'Все ок, Добро пожаловать'});
      });
  })(req, res, next);
});

router.post('/del', (req, res) => {
  req.session.destroy();
  res.json({status: 'Сессия удалена'});
});


module.exports = router;
