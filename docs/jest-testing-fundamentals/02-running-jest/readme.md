# Jest Initialization

jest can we executed by adding a script to _package.json_

```
{
  "scripts": {
    "test": "jest"
  }
}
```

and by running `npm test`

By default jest looks for .js, .jsx, .ts and .tsx files inside of `__tests__` folders, as well as any files with a suffix of .test or .spec (e.g. Component.test.js or Component.spec.js). It will also find files called test.js or spec.js.

jest ignores `node_modules` by default,

if `babel-jest` module is installed, babel will be use to transpile tests and code imported by the tests
