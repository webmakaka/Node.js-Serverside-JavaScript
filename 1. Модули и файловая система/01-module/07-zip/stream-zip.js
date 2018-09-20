const fs = require('fs');
const zlib = require('zlib');
const file = 'test.txt';

fs
  .createReadStream(file)
  .pipe(zlib.createGzip())
  .on('end', () => {
    console.log('Read end');
  })
  .pipe(fs.createWriteStream(file + '.gz'))
  .on('close', () => {
    console.log('Closed');
  })
