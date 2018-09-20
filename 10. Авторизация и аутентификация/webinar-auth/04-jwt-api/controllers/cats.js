const db = require('../models/db');
module.exports.getCats = function (req, res) {
  db
    .gets()
    .then((results) => {
      res.json(results);
    })
    .catch((err) => {
      res
        .status(400)
        .json({err: err.message});
    })
};

module.exports.getCat = function (req, res) {
  db
    .getById(req.params.id)
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        res
          .status(400)
          .json({err: 'Cat not found'});
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({err: err.message});
    })
};

module.exports.addCat = function (req, res) {
  db
    .add(req.body)
    .then((results) => {
      res
        .status(201)
        .json(results);
    })
    .catch((err) => {
      res
        .status(400)
        .json({err: err.message});
    })
};

module.exports.editCat = function (req, res) {
  db
    .update(req.body, req.params.id)
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        res
          .status(400)
          .json({err: 'Cat not found'});
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({err: err.message});
    })
};

module.exports.deleteCat = function (req, res) {
  db
    .delete(req.params.id)
    .then((results) => {
      if (results) {
        res.json(results);
      } else {
        res
          .status(400)
          .json({err: 'Cat not found'});
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({err: err.message});
    })
};
