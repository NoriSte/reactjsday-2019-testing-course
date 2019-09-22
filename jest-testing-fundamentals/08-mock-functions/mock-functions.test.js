test('mock function', () => {
  const fn = jest.fn()

  fn(1)
  expect(fn).toHaveBeenLastCalledWith(1)
  fn(2)
  expect(fn).toHaveBeenLastCalledWith(2)
  fn(3)
  expect(fn).toHaveBeenLastCalledWith(3)

  expect(fn).toHaveBeenCalledWith(1)
  expect(fn).toHaveBeenCalledWith(2)
  expect(fn).toHaveBeenCalledWith(3)

  expect(fn).toHaveBeenCalledTimes(3)

  expect(fn.mock.calls.length).toBe(3)

  // seconds call fist argument
  expect(fn.mock.calls[1][0]).toBe(2)
})

test('mock function with implementation', () => {
  const fn = jest.fn(x => x * x)

  fn(5)

  // returned value
  expect(fn.mock.results[0].value).toBe(25)
})

test('mock times instanciated', () => {
  const fn = jest.fn()

  const a = new fn()
  const b = new fn()

  expect(fn.mock.instances.length).toBe(2)

  expect(fn.mock.instances[0]).toBe(a)
  expect(fn.mock.instances[1]).toBe(b)
})

test('decide mock return value override implementation', () => {
  const fn = jest.fn(() => 42)

  fn()
  expect(fn).toHaveLastReturnedWith(42)

  fn.mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValue(true)

  fn()
  expect(fn).toHaveLastReturnedWith(10)

  fn()
  expect(fn).toHaveLastReturnedWith('x')

  // from now on will always return true

  fn()
  expect(fn).toHaveLastReturnedWith(true)

  fn()
  expect(fn).toHaveLastReturnedWith(true)
})
