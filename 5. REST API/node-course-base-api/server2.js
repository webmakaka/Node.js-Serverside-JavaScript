// подключаем локальную базу данных
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
// подключаем express
const express = require('express');
const app = express();
const router = express.Router();
// для парсинга параметров переданных через POST запрос
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// описание корневого роута
router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});
// GET /users - получаем список всех пользователей
router.route('/users')
  .get((req, res) => {
    res.send(
      db.get('users')
        .value()
    );
  })
// POST /users - добавляем пользователя
  .post((req, res) => {
    const {
      firstName,
      lastName = null,
      phone = null,
      email = null,
      memberSince = null
    } = req.body;
    if (!firstName) res.status(400).send({error: 'Missing required parameter - firstName'});
    db.get('users')
      .push({firstName, lastName, phone, email, memberSince})
      .write();
    const peopleLength = db.get('users').value().length;
    res.header('Location', `http://localhost:3000/api/v1.0/users/${peopleLength}`);
    res.status(201).send('User added');
  });
// GET /users/:user_id - получаем данные о пользователе по его id
router.route('/users/:user_id')
  .get((req, res) => {
    const userId = req.params.user_id;
    const singleUser = db.get(`users[${userId}]`).value();
    if (!singleUser)  res.status(404).send({ error: 'Not found'});
    res.send(singleUser);
  })
// DELETE /users/:user_id - удаляем пользователя по его id
  .delete((req, res) => {
    const userId = req.params.user_id;
    const singleUser = db.get(`users[${userId}]`).value();
    if (!singleUser) res.status(404).send({error: 'Not found'});
    db.get('users')
      .remove({firstName: singleUser.firstName})
      .write();
    res.send(singleUser);
  });
// Добавляем маршрут api
app.use('/api/v1.0', router);
app.use('*', (req, res) => {
  res.status(404).send({error: 'Not found. API is on http://localhost:3000/api/v1.0'});
});
// Обработчик ошибок
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({status: err.status, message: err.message});
});
// Запуск сервера
app.listen(3000, () => console.log('Example app listening on port 3000!'));
