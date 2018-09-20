const fs = require('fs');

const originalRequire = require;

function loadModule(filename, module, require) {
  const wrapSrc = `
  (function(module, exports, require){
    ${fs.readFileSync(filename, 'utf-8')}
  })(module, module.exports, require)
  `
  eval(wrapSrc);
}

var require = (moduleName) => {
  const id = require.resolve(moduleName);
  if (require.cache[id]) {
    return require.cache[id].exports;
  }
  const module = {
    exports: {},
    id: id
  }
  require.cache[id] = module;
  loadModule(id, module, require);
  return module.exports
}

require.cache = {};
require.resolve = (moduleName) => {
  return originalRequire.resolve(moduleName);
}

const test = require('./test');

test();