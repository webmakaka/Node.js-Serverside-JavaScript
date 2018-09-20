const mongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const url = 'mongodb://root:567234@ds121965.mlab.com:21965/it651';
const isNotValid = data => {
  return !!!data.name || !!!data.age;
};

module.exports.gets = function () {
  return new Promise((resolve, reject) => {
    mongoClient
      .connect(url, function (err, db) {
        if (err) {
          reject(err);
        }
        db
          .collection('cats')
          .find()
          .toArray(function (err, results) {
            if (err) {
              reject(err);
            }
            db.close();
            resolve(results);
          });
      });
  })
}

module.exports.getById = function (paramsId) {
  return new Promise((resolve, reject) => {
    const id = new ObjectID(paramsId);
    mongoClient.connect(url, function (err, db) {
      if (err) {
        reject(err);
      }
      db
        .collection('cats')
        .find({"_id": id})
        .toArray(function (err, cat) {
          if (err) {
            reject(err);
          }
          db.close();
          resolve(cat[0]);
        })
    })
  })
}

module.exports.add = function (data) {
  return new Promise((resolve, reject) => {
    if (isNotValid(data)) {
      reject('Data format is not correct')
    }
    let Cat = {
      name: data.name,
      age: parseInt(data.age)
    };
    mongoClient.connect(url, function (err, db) {
      if (err) {
        reject(err);
      }
      db
        .collection('cats')
        .insertOne(Cat, function (err, result) {
          if (err) {
            reject(err);
          }
          db.close();
          resolve(result.ops[0]);
        });
    });
  })
}

module.exports.update = function (data, paramsId) {
  return new Promise((resolve, reject) => {
    const id = new ObjectID(paramsId);
    if (isNotValid(data)) {
      reject('Data format is not correct')
    }
    mongoClient
      .connect(url, function (err, db) {
        if (err) {
          reject(err);
        }

        let updateCat = {
          name: data.name,
          age: parseInt(data.age)
        };

        db
          .collection('cats')
          .findOneAndUpdate({
            _id: id
          }, {
            $set: updateCat
          }, {
            returnOriginal: false
          }, function (err, result) {
            if (err) {
              reject(err);
            }
            db.close();
            resolve(result.value);
          });
      });
  })
}

module.exports.delete = function (paramsId) {
  return new Promise((resolve, reject) => {
    const id = new ObjectID(paramsId);
    mongoClient.connect(url, function (err, db) {
      if (err) {
        reject(err);
      }
      db
        .collection('cats')
        .deleteOne({
          _id: id
        }, function (err, result) {
          if (err) {
            reject(err);
          }
          db.close();
          if (result.result.n === 0) {
            resolve(null);
          } else {
            resolve({result: 'The cat was deleted'});
          }
        });
    });
  })
}