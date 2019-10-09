# The Expect object

The [`expect`](https://jestjs.io/docs/en/expect) global object is not only used to retrieve matcher for a given value, but it also has very handy utilities for assertions too.

### `expect.anything`

[`expect.anything()`](https://jestjs.io/docs/en/expect#expectanything) matches anything but `null` or `undefined`. You can use it inside [`toEqual`](https://jestjs.io/docs/en/expect#toequalvalue) or [`toBeCalledWith`](https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-) instead of a literal value. For example, if you want to check that a mock function is called with a non-null argument

```js
test('anything', () => {
  const mock = jest.fn()
  mock.fn(55)
  expect(mock).toBeCalledWith(expect.anything()) // true
})
```

### `expect.any(constructor)`

[`expect.any`](https://jestjs.io/docs/en/expect#expectanyconstructor) matches with anything that was created with a given constructor

```js
class MyClass {}

test('any', () => {
  expect(Math.random()).toEqual(expect.any(Number))
  expect('aaaaaa').toEqual(expect.any(String))
  expect({ a: 1 }).toEqual(expect.any(Object))
  expect(() => {
    console.log('x')
  }).toEqual(expect.any(Function))

  expect(new MyClass()).toEqual(expect.any(MyClass))
})
```

### `expect.arrayContaining(array)`

```js
test('matches even if received contains additional elements', () => {
  const expected = ['Alice', 'Bob']
  expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(expected))
})
test('does not match if received does not contain expected elements', () => {
  const expected = ['Alice', 'Bob']
  expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(expected))
})
```

### `expect.stringContaining(string)` and `expect.stringMatching(string | regex)`

```js
test('string', () => {
  expect('im no superman').toEqual(expect.stringContaining('man'))
  expect('im no superman').toEqual(expect.stringMatching('man'))
})
```

### `expect.objectContaining(object)`

```js
test('anything', () => {
  const data = {
    name: 'bob',
    age: 44,
    address: {
      city: 'milan',
    },
  }
  expect(data).toEqual(
    expect.objectContaining({
      address: {
        city: expect.any(String),
      },
    }),
  )

  expect(data).toMatchObject({
    name: expect.any(String),
  })
})
```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
