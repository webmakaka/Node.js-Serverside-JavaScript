var app = require('express')();

app.use(function (req, res, next) {
  console.log('Я буду выполнятся всегда');
  next();
});

app.get('/a', function (req, res) {
  console.log('/a: Роут прерван');
  res.send('a');
});

app.get('/a', function (req, res) {
  console.log('/a: Этот роут никогда не вызовется');
});

app.get('/b', function (req, res, next) {
  console.log('/b: Роут не был прерван');
  next();
});

app.use(function (req, res, next) {
  console.log('А я выполняюсь иногда, если сверху не прервут');
  next();
});

app.get('/b', function (req, res, next) {
  console.log('/b (part 2): Я вызвал ошибку!');
  throw new Error('Ошибка в роуте - b');
});

app.use('/b', function (err, req, res, next) {
  console.log('/b Ошибка обнаружена и передана дальше');
  next(err);
});

app.get('/c', function (err, req) {
  console.log('/c: Я вызвал ошибку');
  throw new Error('Ошибка в роуте - c');
});

app.use('/c', function (err, req, res, next) {
  console.log('/c: Ошибка обнаружена и НЕ передана дальше');
  next();
});

app.use(function (err, req, res, next) {
  console.log('Не обработанная ошибка обнаружена!: ' + err.message);
  res.send('500 - ошибка сервере');
});

app.use(function (req, res) {
  console.log('Роут не обработан');
  res.send('404 - страница не найдена');
});

app.listen(3000, function () {
  console.log('Сервер на порту: 3000');
});