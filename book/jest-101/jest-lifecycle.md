# Jest Lifecycle

## Setup and Teardown

You may have some setup work that need to have before tests run (eg seed a test database), or you may have some finishing work that needs to happen after tests run (eg clean the test database, clean jsdom).

Jest providers helper functions to handle this.

Often while writing tests you have some setup work that needs to happen before tests run, and you have some finishing work that needs to happen after tests run. Jest provides helper functions to handle this.

<div data-speaker>
  this is a test for me
</div>

### for every test

`beforeEach` runs before each test and

```
let users

function setup() {
  console.log('setup')
  users = ['jane', 'bob']
}

beforeEach(() => {
  setup()
})

test('removing user', () => {
  expect(users).toHaveLength(2)
  users.pop()
  expect(users).toHaveLength(1)
})
test('adding user', () => {
  expect(users).toHaveLength(2)
  users.push('mark')
  expect(users).toHaveLength(3)
})

```

```
 PASS  ./test.js
  ✓ removing user (3ms)
  ✓ adding user (1ms)

  console.log test.js:5
    setup

  console.log test.js:5
    setup

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

`afterEach` can be used to run after each test

### one-time setup

`beforeAll` and `afterAll` run only once before any test in the file runs and after all tests have been run

### scope

top level`before` and `after` blocks are run for all the tests in the file they are declared

if you want to scope `before` or `after` blocks to specific test, a these can be declared inside a `describe`

```
describe('group', () => {
  beforeEach(() => {
    console.log('called')
  })

  test('test', () => {})
})

test('another test', () => {})

```

```
 PASS  ./test.js
  ✓ another test
  group
    ✓ test (7ms)

  console.log test.js:3
    called

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        2.887s
Ran all test suites.
```

`beforeEach` has been called only once

### multiple setup/teardown

```
beforeAll(() => {
  console.log('called')
})

beforeAll(() => {
  console.log('called too')
})

test('test', () => {})
test('another test', () => {})
```

```
 PASS  ./test.js
  ✓ test
  ✓ another test

  console.log test.js:2
    called

  console.log test.js:6
    called too

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
```

all `before` and `after` can be run multiple times and are executed in the order they are declared (usefull for libraries register their handlers without overriding user declared)

### order of execution

sequentially

- all describe sequencially
  - nested describe takes precedence over sibling
- beforeAll
- every test in order of declaration (despite the depth)
  - beforeEach
  - test
  - afterEach
- afterAll

```
beforeAll(() => {
  console.log('beforeAll')
})

beforeEach(() => {
  console.log('beforeEach')
})

afterAll(() => {
  console.log('afterAll')
})

afterEach(() => {
  console.log('afterEach')
})

describe('outer', () => {
  console.log('descibe outer')
  describe('inner', () => {
    console.log('descibe inner')
    test('inner', () => {
      console.log('outer.inner test')
    })
  })

  test('outer test', () => {
    console.log('outer test')
  })

  describe('inner 2', () => {
    console.log('descibe inner 2')
    test('inner 2', () => {
      console.log('outer.inner 2 test')
    })
  })
})

// descibe outer
// descibe inner
// descibe inner 2
// beforeAll
// beforeEach
// outer.inner test
// afterEach
// beforeEach
// outer test
// afterEach
// beforeEach
// outer.inner 2 test
// afterEach
// afterAll
```

## skip and only

`describe` and `test` can make use of `.skip` to prevent the block from running or `.only` to skip all but this one

```
test('I will not run', () => {
  ...
})
test.only('only me', () => {
  ...
})
```

```
test.skip('I will not run', () => {
  ...
})
test('I will run', () => {
  ...
})
test('I will run too', () => {
  ...
})
```
