const fs = require('fs');
const path = require('path');

fs.unlink('temp/test.txt', (err) => {
  if (err) 
    console.log(err);
  fs.rmdir('temp', (err) => {
    if (err) 
      console.log(err);
    console.log('Delete!');
  })
})