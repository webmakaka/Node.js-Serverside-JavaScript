const fs = require('fs');
const Chance = require('chance');

const chance = new Chance();

const file = fs.createWriteStream('file-stream.txt');

function generateCrazy() {
  while (chance.bool({likelihood: 95})) {
    const isOver = file.write(chance.string({
      length: 16 * 1024
    }));
    if (!isOver) {
      console.log('DRAIN!');
      return file.once('drain', generateCrazy);
    }
  }
  file.end(() => {
    console.log('End crazy text');
  })
}

generateCrazy()