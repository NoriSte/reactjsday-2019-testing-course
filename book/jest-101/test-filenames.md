# Valid file test names

Rename the test to _abc.test.js_. Jest still find it because of the default regex. Now try all other files extention that Jest by [default](https://jestjs.io/docs/en/configuration#testregex-string-array-string) supports:

- `abc.spec.js`
- `spec.js`
- `__tests__/abc.js`

> Note: `__tests__` folder can be inside other folders at any depth, it does not need to be at the project root.

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
