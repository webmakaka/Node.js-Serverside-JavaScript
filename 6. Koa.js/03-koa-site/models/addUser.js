const readline = require('readline');
const rl = readline.createInterface({input: process.stdin, output: process.stdout});
const db = require('./db.js')
const psw = require('../libs/password');

//логин и пароль, изначально пустые
let login = '';
let hash = '';
let salt = '';

//спрашиваем логин
rl.question('Логин: ', answer => {
  //записываем введенный логин
  login = answer;

  //спрашиваем пароль
  rl.question('Пароль: ', answer => {
    //записываем введенный пароль
    password = psw.setPassword(answer);
    // {hash, salt}
    hash = password.hash;
    salt = password.salt;
    //завершаем ввод
    rl.close();
  });
});

//когда ввод будет завершен
rl.on('close', () => {
  // Add a post
  db
    .set('user', {login, hash, salt})
    .write()
})