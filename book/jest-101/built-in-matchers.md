# Built-in Matchers

```js
test('my first test', () => {
  expect(true).toBe(false) // .toBe is a matcher
})
```

[Matchers](https://jestjs.io/docs/en/using-matchers#common-matchers) are functions that compare two value and eventually throw an error if these values don't match. They show useful informations:

- which test failed
- the position of the failed assertion in the test code
- the stacktrace

Jest's expect provides a huge list of matchers and allow to add custom ones.

### `.not` modifier

A matcher can be chained after an optional [`.not`](https://jestjs.io/docs/en/expect#not) modifier which negates the result of the matcher. For example:

```javascript
test('my first test', () => {
  expect(true).not.toBe(false)
})
```

## Common Matchers

### toBe

It uses `Object.is(a,b)` controls the _reference_ of two object to see if they are the same

```javascript
expect(window.document).toBe(document) // true

const a = { text: 'a' }
const b = a
expect(a).toBe(b) // true

const a = { text: 'a' }
const b = { text: 'a' }
expect(a).toBe(b) // false! checking the reference not the value

const a = [0, 1, 2]
const b = [0, 1, 2]
expect(a).toBe(b) // false! checking the reference not the value
```

### toEqual

Checks the equality of two _values_:

```javascript
const a = { text: 'a' }
const b = { text: 'a' }
expect(a).toEqual(b) // true`

const a = [0, 1, 2]
const b = [0, 1, 2]
expect(a).toBe(b) // true
```

### Truthiness matchers

Assert that a value is _truthy_ or _falsy_

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an if statement treats as `true`
- `toBeFalsy` matches anything that an if statement treats as `false`

```javascript
test('null', () => {
  const v = null
  expect(v).toBeNull()
  expect(v).toBeDefined()
  expect(v).not.toBeUndefined()
  expect(v).not.toBeTruthy()
  expect(v).toBeFalsy()
})

test('zero', () => {
  const n = 0
  expect(n).not.toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})
```

### Numbers

```javascript
test('two plus two', () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBeLessThan(5)
  expect(value).toBeLessThanOrEqual(4.5)

  // toBe and toEqual are equivalent for numbers because are primitives (like when using ===)
  expect(value).toBe(4)
  expect(value).toEqual(4)
})
```

If your test does not need to be floating-point precise you can use [`toBeCloseTo`](https://jestjs.io/docs/en/expect#tobeclosetonumber-numdigits) to prevent rounding errors

```javascript
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2 // 0.30000000000000004
  expect(value).toBeCloseTo(0.3) // This works.
})
```

### Strings

```javascript
test('strings', () => {
  expect('aa').toBe('aa') // true
  expect('aa').not.toBe('aaa') // true
  expect('aa').toEqual('aa') // true
  expect('aaa').toContain('aa') // true
})

test('there is no I in team', () => {
  expect('team').not.toMatch(/I/) // true
})

test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/) // true
})
```

### Arrays and iterables

Array and Iterable shares the same APIs:

```javascript
const shoppingList = ['pasta', 'tuna', 'beer']

test('the shopping list has beer on it', () => {
  expect(shoppingList).toHaveLength(3)
  expect(shoppingList).toContain('beer')
  expect(shoppingList).not.toContain('water')
  expect(new Set(shoppingList)).toContain('beer')
})
```

### Objects

```javascript
test('object matcher', () => {
  const data = {
    name: 'bob',
    age: 42,
  }

  expect(data).toMatchObject({ name: 'bob' })
})
```

```javascript
test('object equal', () => {
  const data = {
    name: 'bob',
    age: 42,
    another: undefined,
  }

  expect(data).toEqual({ name: 'bob', age: 42 })
})
```

```javascript
test('object equal', () => {
  const data = {
    name: 'bob',
    age: 42,
    another: undefined,
  }

  expect(data).not.toStrictEqual({ name: 'bob', age: 42 }) // `another` being present but `undefined` fails when strict matching
})
```

### Exceptions

If we want to test that a function throws an error we can use [`toThrow`](https://jestjs.io/docs/en/expect#tothrowerror)

```javascript
function bomb() {
  throw new Error('Boom baby!')
}

test('jest should not explode', () => {
  expect(bomb).toThrow()
  expect(bomb).toThrow(Error)

  expect(bomb).toThrow('Boom')
  expect(bomb).toThrow('Boom baby!')
  expect(bomb).toThrow(/boom/i) // i for case insensitive will fail otherwhise
})
```

> node: we are not calling `bomb` (it will throw and exit Jest) we pass the function to Jest that will call it catching the error for the sake of the assertions

<p style='text-align: right;'>Author: <a href="../about-us.md#jaga-santagostino">Jaga Santagostino</a></p>
