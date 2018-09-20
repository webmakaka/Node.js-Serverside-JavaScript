const fs = require('fs');

const file = fs.createWriteStream('file-stream.txt');

function writeOneMillionTimes(writer, data, encoding, callback) {
  let i = 1000000;
  write();
  function write() {
    let ok = true;
    do {
      i--;
      if (i === 0) {
        // Последняя запись
        writer.write(data, encoding, callback);
      } else {
        // Здесь может быть DRAIN.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Рано остановились, надо будет еще
      console.log('drain: ' + i);
      writer.once('drain', write);
    }
  }
}

writeOneMillionTimes(file, 'help', 'utf-8', () => {
  console.log('Done!');
})