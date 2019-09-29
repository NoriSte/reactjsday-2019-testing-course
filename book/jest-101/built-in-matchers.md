# built-in-matchers

```
test('my first test', () => {
  expect(true).toBe(false) // .toBe is a matcher
})
```

matchers are functions that compare two value and eventually throw an error if these values don't match showing usefull informations:

- failed assertion
- position of the failed assertion in the test code
- stacktrace

jest's expect provides a huge list of matchers and allow to add custom ones

## `.not` modifier

a matcher can be chained after an optional `.not` matcher which returns the opposite negates of the matcher

for examples

```
test('my first test', () => {
  expect(true).not.toBe(false)
})
```

## Common Matchers

### toBe

it uses `Object.is(a,b)` controls the _reference_ of two object to see if it's the same

```
expect(window.document).toBe(document) // true

const a = {text: 'a'}
const b = a
expect(a).toBe(b) // true

const a = {text: 'a'}
const b = {text: 'a'}
expect(a).toBe(b) // false! checking the reference not the value

const a = [0, 1, 2]
const b = [0, 1, 2]
expect(a).toBe(b) // false! checking the reference not the value
```

### toEqual

checks the equality of two _values_

```
const a = { text: 'a' }
const b = { text: 'a' }
expect(a).toEqual(b) // true`

const a = [0, 1, 2]
const b = [0, 1, 2]
expect(a).toBe(b) // true
```

### Truthiness matchers

assert that a value is truthy or falsy

- `toBeNull` matches only `null`
- `toBeUndefined` matches only `undefined`
- `toBeDefined` is the opposite of `toBeUndefined`
- `toBeTruthy` matches anything that an if statement treats as `true`
- `toBeFalsy` matches anything that an if statement treats as `false`

```
test('null', () => {
  const v = null;
  expect(v).toBeNull();
  expect(v).toBeDefined();
  expect(v).not.toBeUndefined();
  expect(v).not.toBeTruthy();
  expect(v).toBeFalsy();
});

test('zero', () => {
  const n = 0;
  expect(n).not.toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});
```

### Numbers

```
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);

  // toBe and toEqual are equivalent for numbers becuase are primitives (like when using ===)
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
```

if your test does not need to be floating-point precise you can use `toBeCloseTo` to prevent rounding errors

```
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2; // 0.30000000000000004
  expect(value).toBeCloseTo(0.3); // This works.
});
```

### Strings

```
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

You can check if an array or iterable contains a particular item using toContain:

```
const shoppingList = [
  'pasta',
  'tuna',
  'beer',
];

test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(shoppingList).not.toContain('water');
  expect(new Set(shoppingList)).toContain('beer');
});
```

### Exceptions

If we want to test that a function throws an error we can use `toThrow`

```
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

> node: we are not calling `bomb` (it will throw and exit jest) we pass the function to jest that will call it catching the error for assertions
