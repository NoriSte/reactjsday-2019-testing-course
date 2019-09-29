# Expect Object

The `expect` global object is not only used to retrieve matcher for a given value, it has very handy utilities for assertion too

### `expect.anything`

expect.anything() matches anything but null or undefined. You can use it inside toEqual or toBeCalledWith instead of a literal value. For example, if you want to check that a mock function is called with a non-null argument

```
test('anything', () => {
  const mock = jest.fn();
  mock.fn(55)
  expect(mock).toBeCalledWith(expect.anything()); // true
});
```

### `expect.any(constructor)`

expect.any matches with anything that was created with a given constructor

```
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

```
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

test('string', () => {
expect('im no superman').toEqual(expect.stringContaining('man'))
expect('im no superman').toEqual(expect.stringMatching('man'))
})

### `expect.objectContaining(object)`

```
test('object', () => {
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
