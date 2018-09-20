import express from 'express';
import routes from './server/routes';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './src/templates/');
app.set('view engine', 'pug');

app.use('/', routes);
app.use(express.static('./build/'));

app.get('*', (req, res) => {
  res.render('error', { title: '404, not found'});
});

app.listen(3002, () => {
  console.log('Example app listening on port 3002!');
});
