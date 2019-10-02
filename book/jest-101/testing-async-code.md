# Testing Async Code

Jest needs to know if it is running async code in order to wait for it to complete

## Callbacks

```js
function getData(cb) {
  /* faking async code */
  const data = {
    name: "bob",
    age: 42
  };

  setTimeout(() => {
    cb(data);
  }, 100);
}

test("using callbacks in jest", () => {
  function callback(data) {
    expect(data).toMatchObject({ name: "NOT BOB" });
  }
  getData(callback);
});
```

> note: `toMatchObject` is a built-in matcher that check for an object to be a suboject of what passed to expected

```yml
 PASS  ./test.js
  ✓ using callbacks in jest

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.55s, estimated 1s
Ran all test suites.

Watch Usage: Press w to show more.
```

the above test will pass making no assertions at all, because Jest does not know that has to wait for the _callback_ passed to `getData` to be called

to overcome this we can declare that we use the `done` argument passed by Jest to our function
this will tell Jest to wait until we call `done` explicitly

```js
test("using callbacks in jest", done => {
  function callback(data) {
    expect(data).toMatchObject({ name: "NOT BOB" });
    done();
  }
  getData(callback);
});
```

now the expectation is called and the test fails as expected

```yml
 FAIL  ./test.js
  ✕ using callbacks in jest (111ms)

  ● using callbacks in jest

    expect(received).toMatchObject(expected)

    - Expected
    + Received

      Object {
    -   "name": "NOT BOB",
    +   "name": "bob",
      }

      13 | test('using callbacks in jest', done => {
      14 |   function callback(data) {
    > 15 |     expect(data).toMatchObject({ name: 'NOT BOB' })
         |                  ^
      16 |     done()
      17 |   }
      18 |   getData(callback)

      at toMatchObject (test.js:15:18)
      at cb (test.js:9:5)
```

### Promises

```js
function getData() {
  /* faking async code */
  const data = {
    name: "bob",
    age: 42
  };

  return Promise.resolve(data);
}

test("using promises in jest", () => {
  return getData().then(data => {
    expect(data).toMatchObject({ name: "not bob" });
  });
});
```

> note: using promises we cannot use the done argument but we MUST return a promise

```yml
 FAIL  ./test.js
  ✕ using promises in jest (4ms)

  ● using promises in jest

    expect(received).toMatchObject(expected)

    - Expected
    + Received

      Object {
    -   "name": "not bob",
    +   "name": "bob",
      }

      11 | test('using promises in jest', () => {
      12 |   return getData().then(data => {
    > 13 |     expect(data).toMatchObject({ name: 'not bob' })
         |                  ^
      14 |   })
      15 | })
      16 |

      at toMatchObject (test.js:13:18)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        0.439s, estimated 1s
Ran all test suites.
```

ths built-in matcher modifier `resolves` is also available to make promises assetion a bit nicer

```js
test("using promises in jest", () => {
  return expect(getData()).resolves.toMatchObject({ name: "bob" });
});
```

#### rejections

to test rejections `.catch` can be chained to a promise or the built-in modifier `rejects` can be use

```js
function getData() {
  /* faking async code */
  return Promise.reject({
    error: "no data"
  });
}

test("using rejected promises with catch", () => {
  return getData().catch(data => {
    expect(data).toMatchObject({ error: "no data" });
  });
});

test("using rejected promises with rejects", () => {
  return expect(getData()).rejects.toMatchObject({ error: "no data" });
});
```

```yml
 PASS  ./test.js
  ✓ using rejected promises with catch
  ✓ using rejected promises with rejects (1ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.483s, estimated 1s
Ran all test suites.

Watch Usage: Press w to show more.
```

#### using async await

to use async await is enought to change the test function to be `async`
it also works when using `resolves`

```js
function getData() {
  /* faking async code */
  const data = {
    name: "bob",
    age: 42
  };

  return Promise.resolve(data);
}

test("using promises with async", async () => {
  const data = await getData();
  expect(data).toMatchObject({ name: "bob" });
});

test("using resolves with async", async () => {
  await expect(getData()).resolves.toMatchObject({ name: "bob" });
});
```
