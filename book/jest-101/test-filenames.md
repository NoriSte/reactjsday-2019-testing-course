# Test Filenames

rename the test to _abc.test.js_

jest still find it because of the default regex

now try all other files extention that jest by default supports:

- `x.js` (to show is not found)
- `abc.spec.js`
- `spec.js`
- `__tests__/abc.js`

> node: `__tests__` folder can be inside other folders at any depth, it does not need to be at the project root
