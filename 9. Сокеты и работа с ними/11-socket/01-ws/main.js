// создаем соединение
const ws = new WebSocket('ws://localhost:8080');

const form = document.querySelector('#send');
const message = document.querySelector('#message');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  ws.send(message.value);
})

ws.onmessage = function (e) {
  const message = JSON.parse(e.data);
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
}
