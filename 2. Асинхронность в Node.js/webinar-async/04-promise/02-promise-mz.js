const fs = require('mz/fs');

fs
  .readFile('data.json', 'utf8')
  .then(data => {
    let result = JSON.parse(data);
    result.test = result.test + 10;
    return result;
  })
  .then(data => {
    return fs.writeFile('data.json', JSON.stringify(data))
  })
  .then(() => {
    console.log('Done');
  })
  .catch(err => {
    console.log(err);
  })