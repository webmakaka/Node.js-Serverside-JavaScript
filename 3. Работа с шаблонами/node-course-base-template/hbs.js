// handlebars template example

const hbs = require('hbs');
const fs = require('fs');
const path = require('path');
const http = require('http');

const fixtures = require('./fixtures');

const index = path.join(__dirname, '/views/hbs/index.hbs');
hbs.registerPartials(path.join(__dirname, '/views/hbs/partials/'));

hbs.registerHelper('bold', (context, options) => {
  // console.log('context', context);
  // console.log('options', options);
  return new hbs.SafeString(
    `<div class="bold"> ${options.fn(context)} </div>`
  );
});

hbs.registerHelper('whichPartial', (options) => {
  // console.log(options.hash.class);
  return options.hash.class === 'block' ? 'block' : 'user';
});

hbs.registerHelper('link', (context, options) => {
  const attrs = [];
  for (let prop in options.hash) {
    attrs.push(`${prop} = "${options.hash[prop]}"`);
  }
  return new hbs.SafeString(
    `<a ${attrs.join(' ')} > ${context} </a>`
  );
});

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/html'});

  const file = fs.readFileSync(index, 'utf8');
  const compiledFunction = hbs.compile(file);

  response.write(compiledFunction({f: fixtures}));

  response.end();
}).listen(3000);
