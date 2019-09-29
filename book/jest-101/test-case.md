# Adding a test case

add this code to _test.js_

```
test('my first test', () => {
  expect(true).toBe(false)
})
```

the above code is composed by `test` a function available in the global scope by jest called with two paremeters, a string that it the test name and a function that is the code that jest will run

`expect` is also a global function injected by jest is get's a parameter (in this case true) and return an object with different methods that allow to compare the value passed to expect to another value

in the example above are are using the `toBe` method that is called a **matcher**

> note: the function `it` is also available globally and is an alias of test

run `npm test`

```
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

it will fail because **expected** and **received** are different

we can see that the name of the test _my first test_ is used to identity a specific test

this is the basic of software testing, a program is run (in this case our function) by our test runner (jest)
we compare the result of the program with an expentation make by us, the programmers in order to verify that the program behave as we expect.

let's fix the test

> SPEAKER_NOTE: in vscode copy the code below and run the command `File: compare active file with clipboard`

```
test('my first test', () => {
  expect(true).toBe(true)
})
```

run `npm test`

🎉🎉🎉🎉  
The test passes hooray  
🎉🎉🎉🎉

### Groping tests

tests can be grouped using `describe` global function

```
describe('group', () => {
  test('test 1', () => {
    expect(true).toBe(true)
  })
})
```

`descibe` can be nested inside another `describe`

```
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

this hierarchy is shown in the test results and allow to have different groups with test having the same name, while possible both nesting and using the same name for different tests is discouraged when not necessary becuause it hurts readability

```
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
