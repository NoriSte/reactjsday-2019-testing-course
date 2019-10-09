# Mock functions

A mock function is a special function that can record when it is invoked, capturing also parameters it was [called with](https://jestjs.io/docs/en/expect#tohavebeencalledwitharg1-arg2-), [return values](https://jestjs.io/docs/en/expect#tohavereturned) and more. Built-in matchers are available to assert how the function behaved.

### Basic mock function

```js
test('mock fn', () => {
  const myMock = jest.fn()

  myMock(1)
  myMock(2)
  myMock(3)

  expect(myMock).toHaveBeenCalledTimes(3)
  expect(myMock).toHaveBeenCalledWith(2)
  expect(myMock).toHaveBeenCalledWith(3)

  expect(myMock).toHaveBeenLastCalledWith(3)
})
```

### Mock implementation

If a function is passed to [`jest.fn()`](https://jestjs.io/docs/en/mock-functions) it will be use to generate the return value of the mock

```js
test('mock implementation', () => {
  const myMock = jest.fn(n => n * n)

  const arr = [2, 3, 4]
  arr.forEach(myMock)

  expect(myMock).toHaveBeenCalledTimes(3)
  expect(myMock).toHaveBeenLastCalledWith(4, 2, arr)
  expect(myMock).lastReturnedWith(16)
})
```

### Mock return value

We can set a value to be returned for the next call or for evey call afterward, by default a mock function returns `undefined`

```js
test('mock fn', () => {
  const myMock = jest.fn()
  console.log(myMock()) // undefined

  myMock
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValue(true)

  console.log(myMock(), myMock(), myMock(), myMock()) // 10, 'x', true, true
})
```

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
