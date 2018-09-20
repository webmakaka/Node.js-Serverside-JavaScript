function * testGenerator() {
  yield 'Yura';
  yield 'Egor';
  return 'Vova';
}

const myGenerator = testGenerator();

console.log(myGenerator.next());
console.log(myGenerator.next());
console.log(myGenerator.next());
console.log(myGenerator.next());