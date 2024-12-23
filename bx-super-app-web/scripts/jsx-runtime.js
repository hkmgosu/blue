//@ts-ignore
const { writeFile, readFile } = require('fs/promises');

const path = './node_modules/react/package.json';

console.log('Fixing JSX-RUNTIME');

readFile(path)
  .then((res) => JSON.parse(res))
  .then((pkg) => {
    if (pkg.version >= '17.0.2' && !pkg.exports) {
      pkg.exports = {
        '.': './index.js',
        './jsx-dev-runtime': './jsx-dev-runtime.js',
        './jsx-runtime': './jsx-runtime.js',
      };
      return writeFile(path, JSON.stringify(pkg, undefined, 4));
    }
  });
