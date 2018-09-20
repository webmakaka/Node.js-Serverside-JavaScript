const stream = require('stream');
const fs = require('fs');
const path = require('path');

class ReadStream extends stream.Readable {
  constructor(file, options) {
    super(options);
    this.rr = fs.createReadStream(file);
  }
  _read(size) {
    this
      .rr
      .on('data', (chunk) => {
        this.push(chunk.toString().toUpperCase());
      })
    this
      .rr
      .on('end', () => {
        this.push(null);
      })
  }
}

const rs = new ReadStream(path.join(__dirname, 'file.txt'));

rs.on('data', (chunk) => {
  console.log(`${chunk.toString()}`);
})

rs.on('end', (chunk) => {
  console.log(`----END----`);
})