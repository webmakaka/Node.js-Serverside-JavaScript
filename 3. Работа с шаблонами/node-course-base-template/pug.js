// pug template example

const pug = require('pug');
const path = require('path');
const http = require('http');

const fixtures = require('./fixtures');

const index = path.join(__dirname, '/views/pug/index.pug');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});

  const compiledFunction = pug.compileFile(index);
  response.write(compiledFunction({f: fixtures}));

  response.end();
}).listen(3000);
