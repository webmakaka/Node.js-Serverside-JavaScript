const fs = require('fs');
const path = require('path');

const file = 'test/test02.txt';

fs.readFile(file, (err, data) => {
  console.log(data.toString());
  if (!fs.existsSync('./temp')) {
    fs.mkdirSync('./temp')
  }
  fs.writeFile('temp/test.txt', data.toString() + ' ups', (err) => {
    console.log('Done!');
  })
})