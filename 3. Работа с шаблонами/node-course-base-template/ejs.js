// ejs template example

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const http = require('http');

const fixtures = require('./fixtures');

const index = path.join(__dirname, '/views/ejs/index.ejs');

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});

  const file = fs.readFileSync(index, 'utf8');
  const compiledFunction = ejs.compile(file, {
    filename: path.join(__dirname, '/views/ejs/included.ejs')
  });

  response.write(compiledFunction({f: fixtures}));

  response.end();
}).listen(3000);
