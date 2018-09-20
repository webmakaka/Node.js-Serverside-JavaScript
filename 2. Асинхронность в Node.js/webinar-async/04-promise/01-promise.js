new Promise(function (resolve, reject) {
  // resolve('ok');
  reject('err')
})
  .then(function (result) {
    console.log(result);
  })
  .catch(function (err) {
    console.log(err);
  });

// vs

new Promise(function (resolve, reject) {
  resolve('ok');
  //reject('err')
})
  .then(function (result) {
    console.log(result);
  }, function (err) {
    console.log(err);
  });