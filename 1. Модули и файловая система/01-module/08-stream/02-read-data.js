process
  .stdin
  .on('data', (chunk) => {
    console.log(`Size: (${chunk.length}) - ${chunk.toString()}`);
  })