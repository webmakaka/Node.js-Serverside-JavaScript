const fs = require('fs');

function asyncFlow(generatorFunc) {
  function cb(err) {
    if (err) {
      return generator.throw(err);
    }
    const results = []
      .slice
      .call(arguments, 1);
    let temp = generator.next(results.length > 1
      ? results
      : results[0]);
    console.log(temp);
  }
  const generator = generatorFunc(cb);

  let temp = generator.next();
  console.log(temp);
}

asyncFlow(function * (cb) {
  const filePath = './src/test.txt';
  const file = yield fs.readFile(filePath, 'utf8', cb);
  yield fs.writeFile('dist/new.txt', file, cb);
})