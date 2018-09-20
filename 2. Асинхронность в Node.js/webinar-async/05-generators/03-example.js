function * testGenerator(i) {
  const test = yield 'Yura: ' + i;
  const test2 = yield 'Egor ' + test;
  return 'Vova ' + test2;
}

const myGenerator = testGenerator('Init');

console.log(myGenerator.next());
console.log(myGenerator.next('Молодец!'));
console.log(myGenerator.next('Тоже молодец!'));
