const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable {
  constructor(options) {
    super(options)
  }
  _write(chunk, encoding, callback) {
    mkdirp(path.dirname(chunk.path), err => {
      if (err) {
        callback(err);
      }
      fs.writeFile(chunk.path, chunk.content, callback);
    });
  }
}

const tfs = new ToFileStream({objectMode: true});

const content = fs.readFileSync('03-read-stream-random.js');

tfs.write({path: 'file.txt', content});
tfs.end(() => {
  console.log('Done!');
})