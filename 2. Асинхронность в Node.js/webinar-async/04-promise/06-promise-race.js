const util = require('util');
const _request = require('request');
const request = util.promisify(_request);

const url = ['https://loftschool.com/api/v1/courses/streams/1', 'https://loftschool.com/api/v1/courses/streams/2', 'https://loftschool.com/api/v1/courses/streams/21']

const p = url.map(item => {
  return request(item);
});

Promise
  .race(p)
  .then((result) => {
    console.log(`${JSON.parse(result.body).special.course_alias}`);
  })

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});