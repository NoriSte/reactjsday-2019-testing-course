# Custom Matchers

Jest offers the API [`expect.extend`](https://jestjs.io/docs/en/expect#expectextendmatchers) to create custom matcher.

### Custom Matchers API

Matchers should return an object (or a Promise of an object) with two keys:

- `pass` to indicates if the test passed
- `message` a function with no arguments that returns an error message in case of failure.

Matchers are called with the argument passed to `expect` and all arguments passed to the custom matcher.

```js
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

```yaml
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

### A complete example

The custom Matcher:

```js
const diff = require('jest-diff') // already available if Jest is installed

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

The test;

```js
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

The result:

```yaml
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

> more into at [https://jestjs.io/docs/en/expect#custom-matchers-api](https://jestjs.io/docs/en/expect#custom-matchers-api)

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
