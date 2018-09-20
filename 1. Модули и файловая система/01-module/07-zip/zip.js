const fs = require('fs');
const zlib = require('zlib');
const file = 'test.txt';

fs.readFile(file, (err, buffer) => {
  zlib.gzip(buffer, (err, buffer) => {
    fs.writeFile(file + '.gz', buffer, err => {
      console.log('Compressed!');
    })
  })
})