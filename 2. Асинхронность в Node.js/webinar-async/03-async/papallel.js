const request = require('request');
const async = require('async');

const url = ['https://loftschool.com/api/v1/courses/streams/1', 'https://loftschool.com/api/v1/courses/streams/2', 'https://loftschool.com/api/v1/courses/streams/3']

async.parallel(url.map(item => {
  return function (cb) {
    request(item, (err, response, body) => {
      cb(err, `${item}  -  ${JSON.parse(body).special.course_alias} \n`);
    })
  }
}), function (err, results) {
  console.log(results);
});