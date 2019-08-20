# What is a test?

TODO: transform this file into some slides and complete writing it

A test is code that throws an error when the actual result of something does not match the expected output.

```javascript
const { sum, subtract } = require("./math");

let result, expected;

result = sum(3, 7);
expected = 10;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}

result = subtract(7, 3);
expected = 4;
if (result !== expected) {
  throw new Error(`${result} is not equal to ${expected}`);
}
```

The part that says actual !== expected is called an "assertion."

example

from https://www.javascriptjanuary.com/blog/but-really-what-is-a-javascript-test
