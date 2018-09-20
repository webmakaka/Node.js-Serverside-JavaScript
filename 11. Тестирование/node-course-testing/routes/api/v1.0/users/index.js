// local database
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./db.json');
const db = low(adapter);

const express = require('express');
const app = module.exports = express();
const HttpError = require('../../../../error');
const Paginate = require('../../../../middelware/paginate');

// get list of resourse and add single user
app.get('/', (req, res) => {
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
});

app.post('/', (req, res) => {
  const {
    firstName,
    lastName = null,
    phone = null,
    email = null,
    memberSince = Date.now()
  } = req.body;
  if (!firstName) throw new HttpError('Missing required parameter - firstName', 400);
  db.get('users')
    .push({firstName, lastName, phone, email, memberSince})
    .write();
  const peopleLength = db.get('users').value().length;
  res.header('Location', `http://localhost:3000/api/v1.0/users/${peopleLength}`);
  res.status(201).send({message: 'User added'});
});

// work with the single user
app.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const singleUser = db.get(`users[${userId}]`).value();
  if (!singleUser) throw new HttpError('Not Found', 404);
  res.send(singleUser);
});

app.delete('/:user_id', (req, res) => {
  const userId = req.params.user_id;
  const singleUser = db.get(`users[${userId}]`).value();
  if (!singleUser) throw new HttpError('Not Found', 404);
  db.get('users')
    .remove({firstName: singleUser.firstName})
    .write();
  res.send(singleUser);
});
