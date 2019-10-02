# custom matchers

jest offert the api `expect.extend` to create custom matchers

Custom Matchers API
Matchers should return an object (or a Promise of an object) with two keys.

- `pass` to indicates if the the test passed
- `message` a function with no arguments that returns an error message in case of failure.

Matchers are called with the argument passed to `expect` and all arguments passed to the custom matcher

```
expect.extend({
  toGandalf() {
    return {
      pass: false,
      message: () => 'you shall not pass',
    }
  },
})

test('custom matcher', () => {
  expect(4).toGandalf()
})
```

```
 FAIL  ./test.js
  ✕ custom matcher (5ms)

  ● custom matcher

    you shall not pass

       9 |
      10 | test('custom matcher', () => {
    > 11 |   expect(4).toGandalf()
         |             ^
      12 | })
      13 |

      at Object.toGandalf (test.js:11:13)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.471s, estimated 1s
Ran all test suites.
```

## complete example

### The custom Matcher

```
const diff = require('jest-diff') // already available if jest installed

expect.extend({
  toBeCompleted(project) {
    const pass = project.tasks.every(task => task.completed)

    function makeExpected() {
      return project.tasks.map(t => {
        return {
          ...t,
          completed: true,
        }
      })
    }

    return {
      pass,
      message: () => {
        const diffString = diff(makeExpected(), project.tasks)

        return `expected all project tasks to be completed:\n ${diffString}`
      },
    }
  },
})
```

### Test

```
test('custom matcher', () => {
  const project = {
    tasks: [
      {
        id: 1,
        completed: true,
      },
      {
        id: 2,
        completed: false,
      },
      {
        id: 2,
        completed: true,
      },
    ],
  }

  expect(project).toBeCompleted()
})

```

### Result

```
 FAIL  ./test.js
  ✕ custom matcher (2ms)

  ● custom matcher

    expected all project tasks to be completed:
     - Expected
    + Received

      Array [
        Object {
          "completed": true,
          "id": 1,
        },
        Object {
    -     "completed": true,
    +     "completed": false,
          "id": 2,
        },
        Object {
          "completed": true,
          "id": 2,
        },
      ]

      50 |   }
      51 |
    > 52 |   expect(project).toBeCompleted()
         |                   ^
      53 | })
      54 |

      at Object.toBeCompleted (test.js:52:19)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.545s, estimated 1s
Ran all test suites.

Watch Usage: Press w to show more.
```
