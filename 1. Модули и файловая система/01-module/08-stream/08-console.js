const fs = require('fs');
const {Console} = require('console');

let output = fs.createWriteStream('./stdout.log');
let outerror = fs.createWriteStream('./stderr.log');

let console = new Console(output, outerror);

console.log('test message');
console.error('Error send');