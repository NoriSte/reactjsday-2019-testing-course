# Adding a test case

Add this code to _test.js_

```javascript
test('my first test', () => {
  expect(true).toBe(false)
})
```

the above code is composed of `test`, a function made available in the global scope by Jest, called with two parameters, a string used as the name of the test and a function that contains the code that Jest will run.

[`expect`](https://jestjs.io/docs/en/expect) is also a global function injected by Jest, it receives a parameter (in this case true) and returns an object with different methods that allow comparing the value passed to expect to another value

in the example above we are using the [`toBe`](https://jestjs.io/docs/en/expect#tobevalue) method, which is a [matcher](https://jestjs.io/docs/en/using-matchers)

> note: the function `it` is also available globally and is an alias of `test`

run `npm test`

```yaml
➜  jest-101 npm test

> jest-101@0.0.1 test /Users/jaga/coding/jest-101
> jest

 FAIL  ./test.js
  ✕ my first test (5ms)

  ● my first test

    expect(received).toBe(expected) // Object.is equality

    Expected: false
    Received: true

      1 | test('my first test', () => {
    > 2 |   expect(true).toBe(false)
        |                ^
      3 | })
      4 |

      at Object.toBe (test.js:2:16)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.89s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

it will fail because `expected` and `received` are different,

We can see that the name of the test _my first test_ is used to identify a specific test.

This is the basis of software testing, a program is run (in this case our function) by the test runner (Jest).
We compare the result of the program with an expectation made by us, in order to verify that the program behaves as we expect.

### Let's fix the test

```javascript
test('my first test', () => {
  expect(true).toBe(true)
})
```

run `npm test`

🎉🎉🎉🎉
The test passes hooray
🎉🎉🎉🎉

### Grouping tests

tests can be grouped using the [`describe`](https://jestjs.io/docs/en/api#describename-fn) global function

```javascript
describe('group', () => {
  test('test 1', () => {
    expect(true).toBe(true)
  })
})
```

`descibe` can be nested inside another `describe`

```javascript
describe('outer group', () => {
  test('outer group test', () => {
    expect(true).toBe(true)
  })

  describe('inner group 1', () => {
    test('inner group test', () => {
      expect(true).toBe(true)
    })
  })
})
```

this hierarchy is shown in the test results and allows to have different groups with test having the same name, while possible both nesting and using the same name for different tests is discouraged when not necessary because it hurts readability

```yaml
 PASS  ./test.js
  outer group
    ✓ outer group test (3ms)
    inner group 1
      ✓ inner group test (1ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.731s, estimated 1s
Ran all test suites.
```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
