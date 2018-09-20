const name = require('./name');
const substack = require('./substack');
const My = require('./class');

name.info('name');
name.log('name');

substack('substack');
substack.log('sub');

const my = new My('My');

my.info('class');
my.log('class');