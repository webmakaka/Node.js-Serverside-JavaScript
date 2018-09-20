const express = require('express');
const bodyParser = require('body-parser');
const routerCats = require('./routes/cats');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use('/api/cats', routerCats);

app.use((req, res, next) => {
  res.status(404).json({err: '404'});
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({err: '500'});
})

app.listen(3000, function() {
  console.log('Server running. Use our API');
})