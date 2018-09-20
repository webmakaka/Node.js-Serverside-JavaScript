const fromArray = require('from2-array');
const through = require('through2');
const fs = require('fs');
const path = require('path');

const _path = {
  src: './src/js',
  dist: './dist/js'
};

const files = ['first.js', 'second.js', 'third.js'].map(item => {
  return path.join(_path.src, item)
});

function concatFiles(dest, files, callback) {
  const destStream = fs.createWriteStream(dest);
  fromArray
    .obj(files)
    .pipe(through.obj((file, enc, done) => {
      const src = fs.createReadStream(file);
      src.pipe(destStream, {end: false});
      src.on('error', err => {
        console.log(err.message);
        done();
      })
      src.on('end', done);
    }))
    .on('finish', () => {
      destStream.end();
      callback();
    })
}

concatFiles(path.join(_path.dist, 'main.js'), files, () => {
  console.log('Concat done!');
})