console.log(process.execPath);
console.log(process.version);
console.log(process.platform);
console.log(process.arch);
console.log(process.title);
console.log(process.pid);
console.log(process.cwd());
console.log(process.argv);

console.log('Test %d str %s', 34, 'stroka');

let a = 5;
let b = 14;
try {
  console.assert(a > b, 'Fail: A > B');
} catch (err) {
  console.log(err.message);
}

process.on('exit', (code) => {
  console.log('Exit: ' + code);
})

process.exit(1);