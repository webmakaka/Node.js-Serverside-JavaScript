// создаем соединение
const socket = io();

const form = document.querySelector('#send');
const message = document.querySelector('#message');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  socket.send(message.value);
})

socket.on('message', (data) => {
  const message = data;
  let text = '';

  switch (message.type) {
    case 'info':
      {
        text = message.message
        break;
      }
    case 'message':
      {
        text = `${message.author} : ${message.message}`;
        break;
      }
    default:
      {
        alert(message.message);
        break;
      }
  }
  const result = document.getElementById('subscribe');
  const messageElem = document.createElement('div');
  messageElem.textContent = text;
  result.appendChild(messageElem);
})
