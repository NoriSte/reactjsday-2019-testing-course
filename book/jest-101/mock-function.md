# mock functions

mock function are a special functions that register call, which parameters it was called with, return values and more

built-in matchers are available to assert how the function behaved

## basic mock function

```
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

## mock implementation

if a function is passed to `jest.fn()` it will be use to generate the return value of the mock

```
test('mock implementation', () => {
  const myMock = jest.fn(n => n * n)

  const arr = [2, 3, 4]
  arr.forEach(myMock)

  expect(myMock).toHaveBeenCalledTimes(3)
  expect(myMock).toHaveBeenLastCalledWith(4, 2, arr)
  expect(myMock).lastReturnedWith(16)
})

```

### mock return value

We can set a value to be returned for the next call or for evey call afterward, by default a mock function returns `undefined`

```
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
