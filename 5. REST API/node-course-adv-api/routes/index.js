const HttpError = require('../error');

module.exports = (app) => {
  app.use('/api', require('./api'));
  app.get('/', (req, res) => {
    throw new HttpError('API is available on /api', 404);
  });
};
