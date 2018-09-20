// local database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// express
const express = require('express');
const app = express();
const router = express.Router();

// errors middleware
const HttpError = require('./error');

// paginator middleware
const Paginate = require('./middelware/paginate');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

router.get('/', (req, res) => {
  res.json({ message: 'hooray! welcome to our api!' });
});

// get list of resourse and add single user
router.route('/users')
  .get((req, res) => {
    const users = db.get('users').value();
    const usersLength = users.length;

    // pagination
    if (req.query.offset) {
      const pageNum = parseInt(req.query.offset || 0, 10);
      const perPage = parseInt(req.query.limit || 1, 10);

      if (!usersLength) throw new HttpError('Cannot get data', 404);
      const page = Paginate(users, pageNum, perPage);

      if (page.nextPage) {
        res.set('Link', `http://localhost:3000/api/v1.0/users?offset=${page.nextPage}&limit=${perPage}`);
      }
      res.set('X-Total-Count', usersLength);
      if (page.pageData.length === 0) throw new HttpError('Empty data', 404);
      res.send(page.pageData);
    } else {
      res.send(
        db.get('users')
          .value()
      );
    }
  })
  .post((req, res) => {
    const {
      firstName,
      lastName = null,
      phone = null,
      email = null,
      memberSince} = req.body;
    if (!firstName) throw new HttpError('Missing required parameter - firstName', 400);
    db.get('users')
      .push({firstName, lastName, phone, email, memberSince})
      .write();
    const peopleLength = db.get('users').value().length;
    res.header('Location', `http://localhost:3000/api/v1.0/users/${peopleLength-1}`);
    res.status(201).send('User added');
  });

// work with the single user
router.route('/users/:user_id')
  .get((req, res) => {
    const userId = req.params.user_id;
    const singleUser = db.get(`users[${userId}]`).value();
    if (!singleUser) throw new HttpError('Not Found', 404);
    res.send(singleUser);
  })
  .delete((req, res) => {
    const userId = req.params.user_id;
    const singleUser = db.get(`users[${userId}]`).value();
    if (!singleUser) throw new HttpError('Not Found', 404);
    db.get('users')
      .remove({firstName: singleUser.firstName})
      .write();
    res.send(singleUser);
  });
// add base route
app.use('/api/v1.0', router);

// main route handler
app.use('*', (req, res) => {
  throw new HttpError('Not found. API is on http://localhost:3000/api/v1.0', 404);
});

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({status: err.status, message: err.message});
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
