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

const clients = {};
let count = 0;

io
  .sockets
  .on('connection', function (socket) {
    let id = count++;
    clients[id] = socket.id;
    console.log(clients);
    socket.send({type: 'hello', message: `Приветствуем! ваш идентификатор  ${id}`, data: id});
    socket.send({type: 'info', message: `K нам присоединился #${id}`});
    socket
      .broadcast
      .send({type: 'info', message: `K нам присоединился #${id}`});
    socket.on('message', message => {
      socket.send({type: 'message', message: message, author: id});
      socket
        .broadcast
        .send({type: 'message', message: message, author: id});
    });
    socket.on('disconnect', (data) => {
      delete clients[id];
      console.log(clients);
    });
  })