const fs = require('fs');

console.log('Начало работы');

setTimeout(() => {
  console.log('setTimeout happened');
}, 0);

fs.open(__filename, 'r', (err, fd) => {
  console.log('file reading!');
});

setImmediate(() => {
  console.log('immediate happened');
});

new Promise(resolve => {
  resolve('promise happened');
}).then(console.log);

process.nextTick(() => {
  console.log('nextTick happened');
});

console.log('Конец файла');