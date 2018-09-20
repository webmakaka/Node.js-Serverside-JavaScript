// ejs template example

const express = require('express');
const app = express();

const fixtures = require('./fixtures');

app.use((req, res, next) => {
  res.locals.f = fixtures;
  next();
});

app.set('views', './views/ejs');
app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  console.log('--- ', req.url);
  res.render('index');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
