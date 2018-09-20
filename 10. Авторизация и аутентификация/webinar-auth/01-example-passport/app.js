const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(session({store: new FileStore(), secret: 'secret of loftschool', resave: false, saveUninitialized: true}));

// хранилище пользователей, в примере он один и хранится в объекте
const userDB = {
  id: '1',
  email: 'loft@loftschool.com',
  password: 'password'
};

// описываем локальную стратегию аутентификации
passport.use(new LocalStrategy({
  usernameField: 'email'
}, (email, password, done) => {
  // Сравниваем пользователя из хранилища (в нашем случае это объект) с тем что
  // пришло с POST запроса на роутер /login в полях email и password
  if (email === userDB.email && password === userDB.password) {
    // если они совпадают передаем объект user в callback функцию done
    console.log('Возвращаем пользователя: ' + JSON.stringify(userDB));
    return done(null, userDB);
  } else {
    // если не соответствуют то отдаем false
    return done(null, false);
  }
}));

passport.serializeUser((user, done) => {
  console.log('Сериализация: ' + JSON.stringify(user));
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // здесь необходимо найти пользователя с данным id но он у нас один и мы просто
  // сравниваем
  console.log('Десериализация: ' + id);
  const user = (userDB.id === id)
    ? userDB
    : false;

  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Это главная страница');
});

app.get('/login', (req, res) => {
  res.send('Это страница авторизации, отправьте сюда POST запрос {email, password}');
});

app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send('Укажите правильный email и пароль!');
    }
    req.login(user, err => {
      return res.send('Вы удачно прошли аутентификацию!');
    });
  })(req, res, next);
});

app.get('/secret', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Вы прошли авторизацию и оказались на закрытой странице');
  } else {
    res
      .status(403)
      .send('Доступ запрещен');
  }
});

app.listen(3000, () => {
  console.log('Сервер запущен на localhost:3000');
});
