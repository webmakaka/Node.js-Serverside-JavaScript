const fs = require("fs");
const Koa = require('koa');
const app = new Koa();
const session = require("koa-session");
const static = require("koa-static");
const Pug = require('koa-pug');
const pug = new Pug({viewPath: './views', pretty: true, basedir: './views', noCache: true, app: app})
const config = require('./config');
const router = require('./routes');

app.use(static('./public'));

if (!fs.existsSync('./public/upload')) {
  fs.mkdirSync('./public/upload')
}

app
  .use(session(config.session, app))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, function () {
  console.log('Server start 3000');
});