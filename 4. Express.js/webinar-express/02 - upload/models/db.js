const nconf = require('nconf');
const path = require('path');

module.exports = function () {
  return nconf
    .argv()
    .env()
    .file({file: path.join(__dirname, 'my-db.json')});
}