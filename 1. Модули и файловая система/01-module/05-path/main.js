const path = require('path');

console.log(path.relative('/data/orandea/test/aaa', '/data/orandea/impl/bbb'));
console.log(path.resolve('/foo/bar', './baz'));
console.log(path.normalize('/foo/bar//baz/asdf/quux/..'));
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\'));
console.log(path.parse('/home/user/dir/file.txt'));
console.log(path.join('/foo', 'bar', 'baz/asdf', 'quux', '..'));
console.log(path.sep);