const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const path = require('path');

//статические ресурсы
app.use(express.static(path.join(__dirname, 'public')));

server.listen(3000, function () {
  console.log('Server running in port 3000');
});

const users = {}; // все пользователи чата
const rooms = ['general', 'random', 'boltalka'];

io
  .sockets
  .on('connection', function (socket) {

    // функция вовзращает массив пользователей, кто находится в комнате room
    let updateUsers = room => {
      // здесь будет список пользователей в комнате room
      let usersRoom = [];
      for (let i in users) {
        // в цикле проходим всех пользователей и если команты совпадают пушим в массив
        if (users[i].room === room) {
          usersRoom.push(users[i].name);
        }
      }
      return usersRoom;
    };

    // событие наступает когда пользователь впервые заходит в чат
    socket.on('adduser', function (username) {
      // установим комнату по умолчанию
      let defaultRoom = rooms[0];
      // создадим объект пользователя
      users[socket.id] = {};
      // присвоем ему его имя или по умолчанию Гость
      users[socket.id].name = username || 'Guest';
      // запомним его комнату
      users[socket.id].room = defaultRoom;
      // присоеденим его к команте по умолчанию
      socket.join(defaultRoom);
      // выполним событие updatechat для сообщения куда он попал
      socket
        .json
        .emit('updatechat', {
          name: 'System',
          msg: `<i>Вы попали в комнату ${defaultRoom}</i>`
        });
      // генерируем событие чтобы сгенерировать ссылки на комнаты на клиенте
      socket
        .json
        .emit('updaterooms', {rooms, current: defaultRoom});
      let newUsers = updateUsers(defaultRoom);
      // сообщаем пользователю список пользователей в комнате
      socket.emit('updateusers', newUsers);
      // сообщаем всем в комнате, что список пользоватлей поменялся
      socket
        .broadcast
        .to(defaultRoom)
        .emit('updateusers', newUsers);
    })

    // событие когда пользователь меняет комнату на другую
    socket.on('switchroom', function (newroom) {
      // запоминаем старую комнату пользователя
      let oldRoom = users[socket.id].room;
      // меняем комнаты у пользователя
      socket.leave(oldRoom);
      socket.join(newroom);
      // запоминаем новую комнату
      users[socket.id].room = newroom;
      // сообщаем пользователю в какую комнату он попал
      socket
        .json
        .emit('updatechat', {
          name: 'System',
          msg: `<i>Вы попали в комнату ${newroom}</i>`
        });
      // сообщаем в старую комнату, что пользователь ее покинул
      socket
        .broadcast
        .to(oldRoom)
        .json
        .emit('updatechat', {
          name: 'System',
          msg: `<i>${users[socket.id].name} покинул комнату</i>`
        });
      // сообщаем в новую комнату, что зашел новый пользователь
      socket
        .broadcast
        .to(newroom)
        .json
        .emit('updatechat', {
          name: 'System',
          msg: `<i>${users[socket.id].name} присоединился к комнате</i>`
        });
      // пересоздаем на клиенте список комнат куда можно перейти
      socket.emit('updaterooms', {rooms, current: newroom});
      let newUsers = updateUsers(newroom);
      // у пользователя формируем новый список пользователей комнаты
      socket.emit('updateusers', newUsers);
      socket
        .broadcast
        .to(newroom)
        .emit('updateusers', newUsers);
      // в старой комнате формируем новый список пользователей комнаты другим
      // пользователям
      socket
        .broadcast
        .to(oldRoom)
        .emit('updateusers', updateUsers(oldRoom));
    });

    // обрабатываем событие когда пользователь, что-то написал в чат
    socket.on('message', function (data) {
      // возвращаем пользователю то, что он написал обратно
      socket
        .json
        .emit('updatechat', {
          name: users[socket.id].name,
          msg: data
        });
      // сообщаем всем пользователям комнаты, что написал пользователь
      socket
        .broadcast
        .to(users[socket.id].room)
        .json
        .emit('updatechat', {
          name: users[socket.id].name,
          msg: data
        });
    });

    socket.on('disconnect', function (data) {
      // запоминаем текущую комнату пользователя
      let room = users[socket.id].room;
      // покидаем комнату
      socket.leave(room);
      // сообащем в комнату, что пользователь ушел с чата
      socket
        .broadcast
        .to(room)
        .json
        .emit('updatechat', {
          name: 'System',
          msg: `<i>${users[socket.id].name} покинул чат</i>`
        });
      // удаляем пользователя
      delete users[socket.id];
      // в команте обновляем список пользователей на клиенте
      socket
        .broadcast
        .to(room)
        .emit('updateusers', updateUsers(room));
    });
  });
