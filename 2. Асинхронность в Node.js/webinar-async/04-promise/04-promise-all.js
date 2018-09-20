const util = require('util');
const _request = require('request');
const request = util.promisify(_request);

const url = ['https://loftschool.com/api/v1/courses/streams/1', 'https://loftschool.com/api/v1/courses/streams/3', 'https://loftschool.com/api/v1/courses/streams/21']

const p = url.map(link => {
  return request(link);
});

Promise
  .all(p)
  .then((result) => {
    result.forEach((item, i) => {
      console.log(`${i} : ${JSON.parse(item.body).special.course_alias}`);
    })
  })
  .catch(console.log)