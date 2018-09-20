const util = require('util');
const _request = require('request');
const request = util.promisify(_request);

const url = Array.from({
  length: 25
}, (_, i) => 'https://loftschool.com/api/v1/courses/streams/' + i);

const p = url.map(item => {
  return request(item);
});

Promise
  .all(p.map(item => item.catch(err => err)))
  .then((result) => {
    result.forEach((item, i) => {
      try {
        console.log(`${i} : ${JSON.parse(item.body).special.course_alias}`);
      } catch (e) {}
    })
  })
  .catch(console.log);

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});