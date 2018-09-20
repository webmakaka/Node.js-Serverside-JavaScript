'use strict';

/*
 Задача скрипта - создать нового пользователя
 */

//подключаем модули
const mongoose = require('mongoose');
const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:567234a@ds135537.mlab.com:35537/passport', {useMongoClient: true});

//логин и пароль, изначально пустые
let login = '',
  password = '';

//спрашиваем логин
rl.question('Логин: ', answer => {
  //записываем введенный логин
  login = answer;

  //спрашиваем пароль
  rl.question('Пароль: ', answer => {
    //записываем введенный пароль
    password = answer;

    //завершаем ввод
    rl.close();
  });
});

//когда ввод будет завершен
rl.on('close', () => {
  //подключаем модель пользователя
  require('./models/user');

  //создаем экземпляр пользователя и указываем введенные данные
  const User = mongoose.model('login');
  const adminUser = new User({login: login});

  adminUser.setPassword(password);

  //пытаемся найти пользователя с таким логином
  User
    .findOne({login: login})
    .then(u => {
      //если такой пользователь уже есть - сообщаем об этом
      if (u) {
        throw new Error('Такой пользователь уже существует!');
      }

      //если нет - добавляем пользователя в базу
      return adminUser.save();
    })
    .then(u => console.log('ok!'), e => console.error(e.message))
    .then(() => mongoose.connection.close(function () {
      process.exit(0);
    }));
});