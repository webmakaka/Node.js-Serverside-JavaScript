process
  .stdin
  .on('readable', () => {
    let chunk;
    while ((chunk = process.stdin.read()) !== null) {
      console.log(`Size: (${chunk.length}) - ${chunk.toString()}`);
    }
  })