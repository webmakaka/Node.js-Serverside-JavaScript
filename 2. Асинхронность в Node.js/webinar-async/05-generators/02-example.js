function * testGenerator(arr) {
  for (let i = 0; i < arr.length; i++) {
    yield arr[i];
  }
}

const myGenerator = testGenerator(['Yura', 'Vova', 'Lexa']);

let item = myGenerator.next();

while (!item.done) {
  console.log(item.value);
  item = myGenerator.next();
}
