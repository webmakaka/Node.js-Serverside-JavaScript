const fs = require('fs');

function readFileThunk(filename, options) {
  return function (cb) {
    fs.readFile(filename, options, cb)
  }
}

function writeFileThunk(filename, buffer) {
  return function (cb) {
    fs.writeFile(filename, buffer, cb)
  }
}

function asyncFlow(generatorFunc) {
  function cb(err) {
    if (err) {
      return generator.throw(err);
    }
    const results = []
      .slice
      .call(arguments, 1);
    let thunk = generator
      .next(results.length > 1
      ? results
      : results[0])
      .value;

    thunk && thunk(cb);
  }
  const generator = generatorFunc(cb);

  let thunk = generator
    .next()
    .value;
  // (typeof thunk === 'function') ? thunk(cb) : void 0;
  thunk && thunk(cb);
}

asyncFlow(function * (cb) {
  const filePath = './src/test.txt';
  const file = yield readFileThunk(filePath, 'utf8');
  yield writeFileThunk('dist/new.txt', file);
})
